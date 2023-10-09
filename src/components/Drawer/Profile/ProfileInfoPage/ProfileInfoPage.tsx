import { ApiError } from '@kvika/api-client';
import * as React from 'react';
import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';
import { useAnalytics } from '@segment/analytics-react-native';

import { useSelector } from 'react-redux';
import KvikaApiClient from '../../../../api/KvikaApiClient';
import { isProd } from '../../../../env/Environment';
import { selectUserState } from '../../../../store/user';
import { DeviceBiometricType } from '../../../../utils/Biometrics/BiometricsTypes';
import { errorHandling } from '../../../../utils/ErrorUtils';
import { registerForPushNotificationsAsync } from '../../../../utils/Utils';
import BiometricsRow from './BiometricsRow';
import DebugSection from './DebugSection';
import EmailRow from './EmailRow';
import ProfileHeader from './ProfileHeader';
import SendTipRow from './SendTipRow';
import TermsRow from './TermsRow';
import {
  getAvailableBiometricType,
  getIsBiometricsEnabled,
  storeBiometricsPreference,
} from '../../../../utils/Biometrics/BiometricsUtils';
import VersionRow from './VersionRow';
import { SegmentTrackingId } from '../../../../types/Types';

type Props = {
  onLogout: () => void;
};

const ProfileInfoPage = ({ onLogout }: Props) => {
  const [isLoadingResetUser, setIsLoadingResetUser] = React.useState(false);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = React.useState(false);
  const [availableBiometricType, setAvailableBiometricType] = React.useState<DeviceBiometricType>(
    DeviceBiometricType.NotAvailable
  );
  const { email } = useSelector(selectUserState);
  const { track } = useAnalytics();

  React.useEffect(() => {
    getAvailableBiometricType({ skipStoredPreferenceCheck: true }).then((biometricType) => {
      setAvailableBiometricType(biometricType);
    });
    getIsBiometricsEnabled().then((isEnabled) => {
      setIsBiometricsEnabled(isEnabled);
    });
  }, []);

  const onResetUserPress = () => {
    setIsLoadingResetUser(true);
    KvikaApiClient.getApiClient().then((client) => {
      client
        .clearAnswersOnStaging()
        .then(onLogout)
        .catch((error: ApiError) => errorHandling({ error }));
    });
  };

  const onDebugPushNotificationPress = () => {
    registerForPushNotificationsAsync().then((token) => {
      Alert.alert(
        'Push notification testing',
        'Here you can test sending push notifications',
        [
          {
            text: 'Copy push token to clipboard',
            onPress: () => {
              Clipboard.setStringAsync(token || '');
            },
            style: 'default',
          },
          { text: 'Cancel', onPress: () => null },
        ],

        { cancelable: true }
      );
    });
  };

  return (
    <>
      <ProfileHeader />
      <EmailRow email={email} />
      {availableBiometricType !== DeviceBiometricType.NotAvailable && (
        <BiometricsRow
          onChange={(enableBiometrics) => {
            track(SegmentTrackingId.BiometricSwitchToggle, { biometricsEnabled: enableBiometrics });
            storeBiometricsPreference({ enableBiometrics });
            setIsBiometricsEnabled(enableBiometrics);
          }}
          isBiometricsEnabled={isBiometricsEnabled}
          availableBiometricType={availableBiometricType}
        />
      )}
      <SendTipRow />
      <TermsRow />
      <VersionRow />
      {!isProd() && (
        <DebugSection
          onResetUserPress={onResetUserPress}
          onDebugPushNotificationPress={onDebugPushNotificationPress}
          isLoadingResetUser={isLoadingResetUser}
        />
      )}
    </>
  );
};
export default ProfileInfoPage;
