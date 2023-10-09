import { useAnalytics } from '@segment/analytics-react-native';
import * as React from 'react';
import { Alert, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ApiError } from '@kvika/api-client';

import KvikaApiClient from '../../api/KvikaApiClient';
import LottieAnimation from '../../components/Lottie/LottieAnimation';
import { deleteAuthToken, getAuthToken } from '../../api/AuthenticationStorage';
import { SplashScreenProps } from '../../navigation/NavigationTypes';
import { Screen } from '../../navigation/Routes';
import { selectAppStateStatus } from '../../store/appStateStatus';
import { DeviceBiometricType } from '../../utils/Biometrics/BiometricsTypes';
import {
  deleteBiometricsPreference,
  getAvailableBiometricType,
  promptLoginWithBiometrics,
} from '../../utils/Biometrics/BiometricsUtils';
import { StyledView, StyledContainer } from './SplashScreenStyles';
import { logout, updateUser } from '../../store/user';
import { errorHandling } from '../../utils/ErrorUtils';
import { ErrorStrings, LoginScreenText } from '../../constants/Text';
import { SegmentTrackingId } from '../../types/Types';

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const appStateStatus = useSelector(selectAppStateStatus);
  const dispatch = useDispatch();

  const handleLoginExpired = React.useCallback(() => {
    deleteAuthToken();
    dispatch(logout());
    deleteBiometricsPreference();
    Alert.alert(ErrorStrings.ErrorHeadline, LoginScreenText.Expired);
    navigation.replace(Screen.LoginScreen, { hasAuthToken: false });
  }, [dispatch, navigation]);

  const { track } = useAnalytics();

  React.useEffect(() => {
    const checkStatus = async () => {
      // When app is backgrounded it's redirected here to the Splash Screen.
      // This logic handles redirecting to Login or Home and uses Biometrics if possible.
      if (appStateStatus.currStatus === 'active') {
        const authToken = await getAuthToken();
        const biometricType = await getAvailableBiometricType();
        if (authToken) {
          if (biometricType === DeviceBiometricType.NotAvailable) {
            navigation.replace(Screen.LoginScreen, { hasAuthToken: true });
          } else {
            track(SegmentTrackingId.BiometricLoginStarted);
            promptLoginWithBiometrics(biometricType).then((authResult) => {
              if (authResult.success) {
                track(SegmentTrackingId.BiometricLoginCompleted);

                KvikaApiClient.getApiClient({ dispatch }).then((client) => {
                  client
                    .getUserDetails()
                    .then((userDetails) => {
                      dispatch(
                        updateUser({
                          ssn: userDetails.ssn,
                          name: userDetails.fullName,
                          email: userDetails.email ?? userDetails.pendingEmail ?? '',
                        })
                      );
                      navigation.replace(Screen.HomeScreenWrapper);
                    })
                    .catch((error: ApiError) => {
                      const status = error.response?.status;
                      if (status === 401) {
                        handleLoginExpired();
                      } else {
                        errorHandling({ error });
                        navigation.replace(Screen.HomeScreenWrapper);
                      }
                    });
                });
              } else {
                navigation.replace(Screen.LoginScreen, { hasAuthToken: true });
              }
            });
          }
        } else {
          navigation.replace(Screen.LoginScreen, { hasAuthToken: false });
        }
      }
    };

    setTimeout(() => {
      checkStatus();
    }, 1000);
  }, [appStateStatus.currStatus, dispatch, fadeAnim, handleLoginExpired, navigation, track]);

  return (
    <StyledContainer>
      <StyledView>
        <LottieAnimation
          source={require('../../../assets/lottie/kvika_logo_splash.json')}
          playAnimation={appStateStatus.currStatus === 'active'}
        />
      </StyledView>
    </StyledContainer>
  );
};

export default SplashScreen;
