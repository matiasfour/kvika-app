import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import { ApiError } from '@kvika/api-client';
import { AuthLoginInitResponseSchema, AuthLoginResponseSchema, HttpExceptionType } from '@kvika/api-types';
import { Colors } from '@kvika/theme';
import { useAnalytics } from '@segment/analytics-react-native';
import * as Sentry from 'sentry-expo';

import LoginInput from './LoginInput/LoginInput';
import KvikaApiClient from '../../api/KvikaApiClient';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import { StyledLogin } from './LoginScreenStyles';
import { LoginScreenProps } from '../../navigation/NavigationTypes';
import { DeviceBiometricType } from '../../utils/Biometrics/BiometricsTypes';
import { getAvailableBiometricType, promptLoginWithBiometrics } from '../../utils/Biometrics/BiometricsUtils';
import LoginButtons from './LoginButtons/LoginButtons';
import LoginHeaderContainer from './LoginHeaderContainer';
import { Screen } from '../../navigation/Routes';
import { updateUser } from '../../store/user';
import { errorHandling } from '../../utils/ErrorUtils';
import { getPlatform, registerForPushNotificationsAsync } from '../../utils/Utils';
import { postSelectedInvesmentUserAndGetPortfolioAccess } from '../../utils/LoginUtils';
import { updateAvailableUserAccounts, updateSelectedUserAccount } from '../../store/userAccount';
import { ErrorStrings, LoginScreenText } from '../../constants/Text';
import { SelectedTab, SegmentTrackingId, LoginStatusProps } from '../../types/Types';
import { ServerErrorCode } from '../../constants/GeneralConstants';

const TAB_TITLES = [LoginScreenText.ElectronicID, LoginScreenText.ElectronicSim];

const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const { hasAuthToken } = route.params;
  const [availableBiometricType, setAvailableBiometricType] = React.useState<DeviceBiometricType>(
    DeviceBiometricType.NotAvailable
  );
  const [selectedTab, setSelectedTab] = React.useState<SelectedTab>({
    index: 0,
    tabTitle: TAB_TITLES[0],
  });
  const [isReady, setIsReady] = React.useState(false);
  const [showLoginInput, setShowLoginInput] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [identifier, setIdentifier] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');

  const dispatch = useDispatch();

  const { track } = useAnalytics();

  React.useEffect(() => {
    getAvailableBiometricType().then((biometricType) => {
      setAvailableBiometricType(biometricType);
      setShowLoginInput(!hasAuthToken || biometricType === DeviceBiometricType.NotAvailable);
      setIsReady(true);
    });
  }, [hasAuthToken]);

  const getAlertMessage = (loginError: ApiError) => {
    const isAuthError = loginError.response?.data.type === HttpExceptionType.AUTH_ERROR;
    const errorCode = loginError.response?.data.code;
    if (isAuthError && errorCode === ServerErrorCode.AUTH_ERROR__USER_DOESNT_HAVE_PORTFOLIO) {
      return { title: LoginScreenText.UserNotFound, message: LoginScreenText.NoUserWithThisPhoneNumber };
    }
    if (isAuthError && errorCode === ServerErrorCode.AUTH_ERROR__AUDKENNI_FAILURE) {
      return { message: LoginScreenText.UserCancelation };
    }
    if (loginError.response?.status === 401) {
      return { message: LoginScreenText.IdentificationFailed };
    }
    return undefined;
  };

  const onStartLoginSuccess = (response: AuthLoginInitResponseSchema) => {
    // If we get a verification code in the response that means we are using the auðkenni app
    response.verificationCode && setVerificationCode(response.verificationCode);
    // Wait 6 seconds until we check the login status since it always takes a few seconds to finish signing with EID or Auðkenni app
    setTimeout(() => {
      const currentDate = new Date();
      // We create this to stop polling 120 seconds from now
      const lastPollingTime = new Date(currentDate.getTime() + 120000);
      checkLoginStatus({ loginToken: response.loginRequestToken, firstTime: 0, secondTime: 1000, lastPollingTime });
    }, 6000);
  };

  const onLoginPress = () => {
    const isAppleReviewer = identifier === '1234567';
    // For Apple reviewers, log into app (they won't be able to do anything)
    if (isAppleReviewer) {
      navigation.replace(Screen.HomeScreenWrapper, { isAppleReviewer: true });
    } else {
      // TODO: Add phone number validation and some sort of red text if the phone number is invalid?
      // TODO: Handle error where a user does not have a portfolio once the backend supports this.
      track(SegmentTrackingId.LoginStarted, { identifier });
      setIsLoading(true);
      registerForPushNotificationsAsync().then(async (pushToken) => {
        KvikaApiClient.getApiClient().then((apiClient) => {
          apiClient
            .postStartLogin({ identifier, pushToken }, getPlatform())
            .then((response) => {
              onStartLoginSuccess(response);
            })
            .catch((loginError: ApiError) => {
              onLoginFailed(loginError, SegmentTrackingId.LoginStartFailed);
            });
        });
      });
    }
  };

  const onLoginSuccess = (response: AuthLoginResponseSchema) => {
    const data = {
      ssn: response.ssn,
      name: response.fullName,
      email: response.email ?? '',
    };
    dispatch(updateUser(data));
    Sentry.Native.setUser({ id: response.externalId });
    track(SegmentTrackingId.LoginCompleted, { identifier });
    getInvestmentUsers(response.termsApproved);
  };

  const onLoginRetry = (loginToken: string, firstTime: number, secondTime: number, lastPollingTime: Date) => {
    // Add this check so that we are not checking the login status infinitaly, stop if 120 seconds have passed since the first request
    if (lastPollingTime > new Date()) {
      const timeToWait = firstTime + secondTime;
      setTimeout(() => {
        // We do this to poll the api incrementally using fibonacci
        checkLoginStatus({ loginToken, firstTime: secondTime, secondTime: timeToWait, lastPollingTime });
      }, timeToWait);
    } else {
      Alert.alert(LoginScreenText.IdentificationFailed, LoginScreenText.Expired);
      setIsLoading(false);
    }
  };

  const onLoginFailed = (loginError: ApiError, event: string) => {
    track(event, { identifier });
    const alertData = getAlertMessage(loginError);
    setIdentifier('');
    setVerificationCode('');
    errorHandling({
      error: loginError,
      alertData,
    });
    setIsLoading(false);
  };

  const checkLoginStatus = ({
    loginToken,
    firstTime = 0,
    secondTime = 1000,
    lastPollingTime = new Date(),
  }: LoginStatusProps) => {
    setIsLoading(true);
    loginToken &&
      KvikaApiClient.getApiClient({ loginRequestToken: loginToken }).then((apiClient) => {
        apiClient
          .getLoginStatus(identifier)
          .then((response) => {
            onLoginSuccess(response);
          })
          .catch((loginError: ApiError) => {
            // 412 means the process is still on going so we try again
            if (loginError.response?.status === 412) {
              onLoginRetry(loginToken, firstTime, secondTime, lastPollingTime);
            } else {
              onLoginFailed(loginError, SegmentTrackingId.LoginFailed);
            }
          });
      });
  };

  const getInvestmentUsers = (isTermsApproved?: boolean) => {
    KvikaApiClient.getApiClient({ dispatch }).then((client) => {
      client
        .getInvestmentUsers()
        .then((users) => {
          dispatch(updateAvailableUserAccounts(users));
          if (isTermsApproved) {
            // Only go to user sreen if there are more then 1 accounts available
            if (users.length > 1) {
              navigation.replace(Screen.UserScreen);
            } else if (users.length === 1) {
              // If there is only one account available we set that as the selected user account
              dispatch(updateSelectedUserAccount(users[0]));
              postSelectedInvesmentUserAndGetPortfolioAccess({
                investmentUserId: users[0].investmentUserId,
                dispatch,
                navigation,
                setIsLoading,
              });
            } else {
              Alert.alert(ErrorStrings.ErrorHeadline, LoginScreenText.UserNotFound);
            }
          } else {
            navigation.replace(Screen.TermsAndConditionsScreen);
          }
        })
        .catch((error: ApiError) => {
          errorHandling({ error });
          setIsLoading(false);
        });
    });
  };

  const handleLoginWithBiometrics = () => {
    track(SegmentTrackingId.BiometricLoginStarted);

    promptLoginWithBiometrics(availableBiometricType).then((authResult) => {
      if (authResult.success) {
        track(SegmentTrackingId.BiometricLoginCompleted);
        navigation.replace(Screen.HomeScreenWrapper);
      }
    });
  };

  const handleChangeTab = (index: number) => {
    setIdentifier('');
    setVerificationCode('');
    setSelectedTab({ index, tabTitle: TAB_TITLES[index] });
  };

  return (
    <ScreenLayout backgroundColor={Colors.black5}>
      {isReady ? (
        <StyledLogin>
          <LoginHeaderContainer showPhoneInput={showLoginInput} biometricType={availableBiometricType} />
          {showLoginInput ? (
            <LoginInput
              onLoginPress={onLoginPress}
              isLoading={isLoading}
              isLoggingInWithEID={selectedTab.index === 0}
              identifier={identifier}
              setIdentifier={setIdentifier}
              verificationCode={verificationCode}
              selectedTab={selectedTab}
              handleChangeTab={handleChangeTab}
              tabTitles={TAB_TITLES}
            />
          ) : (
            <LoginButtons
              onPressEID={() => setShowLoginInput(true)}
              onPressBiometrics={handleLoginWithBiometrics}
              biometricType={availableBiometricType}
            />
          )}
        </StyledLogin>
      ) : null}
    </ScreenLayout>
  );
};

export default LoginScreen;
