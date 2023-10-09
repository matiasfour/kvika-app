/* eslint-disable no-alert */
import { ApiError } from '@kvika/api-client';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import * as Updates from 'expo-updates';
import * as Sentry from 'sentry-expo';
import { Alert, Animated, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import KvikaApiClient from '../../api/KvikaApiClient';
import { PERIODS } from '../../constants/PeriodConstants';
import { ErrorStrings, HeaderText, SelectPortfoliosScreenText } from '../../constants/Text';
import { FontSize, FontWeight } from '../../dls/StyleGuide';
import { updatePortfolioAccess } from '../../store/portfolio';
import { selectPeriod } from '../../store/ppid';
import {
  selectAvailableUserAccounts,
  selectSelectedUserAccount,
  updateAvailableUserAccounts,
  updateSelectedUserAccount,
} from '../../store/userAccount';
import Calendar from '../../svg/Calendar';
import Folder from '../../svg/Folder';
import KvikaLogo from '../../svg/KvikaLogo';
import Profile from '../../svg/Profile';
import { errorHandling } from '../../utils/ErrorUtils';
import { getInitials } from '../../utils/Utils';
import KvikaButton from '../KvikaButton/KvikaButton';
import KvikaText from '../KvikaText';
import {
  StyledCharCircle,
  StyledCircleContainer,
  StyledHeader,
  StyledKvikaButton,
  StyledLogo,
  StyledNotificationBubble,
} from './KvikaHeaderStyles';

type Props = {
  onPeriodPickerPress: () => void;
  onPortfolioPickerPress: () => void;
  onProfilePress: () => void;
  isAppleReviewer?: boolean;
  onLogOut: () => void;
  onLogoPress: () => void;
};

const Header = ({
  onPeriodPickerPress,
  onPortfolioPickerPress,
  onProfilePress,
  isAppleReviewer = false,
  onLogOut,
  onLogoPress,
}: Props) => {
  const availableUserAccounts = useSelector(selectAvailableUserAccounts);
  const selectedUserAccount = useSelector(selectSelectedUserAccount);
  const selectedPeriod = useSelector(selectPeriod);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isUpdateAvailableOnDevice, setIsUpdateAvailableOnDevice] = React.useState<boolean>(false);
  const progressAnim = React.useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();

  const getSelectedInvestmentUser = React.useCallback(() => {
    // Only get selected user account if the local one is empty
    !selectedUserAccount &&
      KvikaApiClient.getApiClient({ dispatch }).then((client) => {
        client
          .getSelectedInvestmentUser()
          .then((investmentUser) => {
            dispatch(updateSelectedUserAccount(investmentUser));
          })
          .catch((error: ApiError) => {
            onLogOut();
            errorHandling({ error });
          });
      });
  }, [dispatch, onLogOut, selectedUserAccount]);

  const getInvestmentUsers = React.useCallback(() => {
    // Only get available user accounts if the local one is empty
    availableUserAccounts.length < 1 &&
      KvikaApiClient.getApiClient({ dispatch }).then((client) => {
        client
          .getInvestmentUsers()
          .then((investmentUsers) => {
            dispatch(updateAvailableUserAccounts(investmentUsers));
          })
          .catch((error: ApiError) => {
            errorHandling({ error });
          });
      });
  }, [availableUserAccounts.length, dispatch]);

  const getPortfolioAccess = React.useCallback(() => {
    setIsLoading(true);
    KvikaApiClient.getApiClient({ dispatch }).then((client) => {
      client
        .getPortfolioAccessForSelectedUser()
        .then((portfolioAccess) => {
          dispatch(updatePortfolioAccess(portfolioAccess));
          setIsLoading(false);
        })
        .catch((error: ApiError) => {
          setIsLoading(false);
          onLogOut();
          errorHandling({ error });
        });
    });
  }, [dispatch, onLogOut]);

  const showReloadAlert = () => {
    if (!__DEV__) {
      Alert.alert(HeaderText.ExpoUpdateAvailable, HeaderText.RestartToUpdate, [
        { text: HeaderText.NoThanks },
        {
          text: HeaderText.RestartApp,
          onPress: async () => {
            try {
              await Updates.reloadAsync();
            } catch (error) {
              Sentry.Native.captureMessage(ErrorStrings.ExpoReloadError);
            }
          },
        },
      ]);
    }
  };

  const checkAndFetchExpoUpdate = () => {
    if (!__DEV__) {
      // Checks the server to see if a newly deployed update to the project is available.
      Updates.checkForUpdateAsync()
        .then((updateInfo) => {
          if (updateInfo.isAvailable) {
            // Downloads the most recently deployed update to the project from server to the device's local storage.
            Updates.fetchUpdateAsync()
              .then((updateResult) => {
                // This should always be true if isAvailable was true
                if (updateResult.isNew) {
                  setIsUpdateAvailableOnDevice(true);
                }
              })
              .catch((error) => {
                Sentry.Native.captureException(error, { extra: { message: ErrorStrings.ExpoFetchUpdateError } });
              });
          }
        })
        .catch((error) => {
          Sentry.Native.captureException(error, { extra: { message: ErrorStrings.ExpoCheckForUpdatesError } });
        });
    }
  };

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (!__DEV__) {
      const expoUpdateListener = Updates.addListener((event) => {
        // This event lets us know a new update has finished downloading to local storage.
        // It only occurs after an auto-update (i.e. user opens app after it was closed and it starts a download),
        // i.e. not the manual update that we otherwise initiate.
        if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
          setIsUpdateAvailableOnDevice(true);
        }
      });

      checkAndFetchExpoUpdate();

      return () => {
        if (expoUpdateListener && expoUpdateListener.remove) {
          expoUpdateListener.remove();
        }
      };
    }
  }, []);

  React.useEffect(() => {
    if (isUpdateAvailableOnDevice) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(progressAnim, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(progressAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [isUpdateAvailableOnDevice, progressAnim]);

  // This is needed to fetch relevant data when logging in via biometrics
  React.useEffect(() => {
    if (!isAppleReviewer) {
      getInvestmentUsers();
      getSelectedInvestmentUser();
      getPortfolioAccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledHeader>
      <StyledLogo onPress={onLogoPress}>
        <KvikaLogo vbHeight={76} vbWidth={88} />
      </StyledLogo>
      <KvikaButton
        fontSize={FontSize.BodySmall}
        title={PERIODS.find((period) => period.type === selectedPeriod)?.text}
        icon={<Calendar color={Colors.gold400} />}
        onPress={onPeriodPickerPress}
        transparent
      />
      <StyledKvikaButton
        title={SelectPortfoliosScreenText.Portfolios}
        fontSize={FontSize.BodySmall}
        icon={<Folder color={Colors.gold400} />}
        onPress={onPortfolioPickerPress}
        transparent
        disabled={isLoading}
      />

      <Pressable
        onPress={() => {
          if (isUpdateAvailableOnDevice) {
            showReloadAlert();
          }
          onProfilePress();
        }}
      >
        {({ pressed }) => (
          <StyledCircleContainer pressed={pressed}>
            {availableUserAccounts.length > 1 && selectedUserAccount ? (
              <StyledCharCircle>
                <KvikaText allowFontScaling={false} fontSize={FontSize.Small} fontWeight={FontWeight.Medium}>
                  {getInitials(selectedUserAccount.investmentUserName)}
                </KvikaText>
              </StyledCharCircle>
            ) : (
              <Profile color={Colors.gold400} height={24} width={24} />
            )}
            {isUpdateAvailableOnDevice && <StyledNotificationBubble style={{ transform: [{ scale: progressAnim }] }} />}
          </StyledCircleContainer>
        )}
      </Pressable>
    </StyledHeader>
  );
};

export default Header;
