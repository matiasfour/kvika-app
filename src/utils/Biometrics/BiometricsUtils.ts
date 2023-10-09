import { Alert } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GeneralText } from '../../constants/Text';
import { AsyncStorageKeys } from '../../constants/AsyncStorage';
import { DeviceBiometricType } from './BiometricsTypes';
import { getEnableLoginViaBiometricsText, getLoginWithBiometricsText } from './BiometricsText';

/**
 * Checks if the device has a biometric sensor (fingerprint/face)
 * and that the user has saved fingerprints/facial data on device.
 */
export const getIsDeviceBiometricsCapableAndEnrolled = async () => {
  const hasBiometricsHardware = await LocalAuthentication.hasHardwareAsync();
  const isDeviceEnrolled = await LocalAuthentication.isEnrolledAsync();
  return hasBiometricsHardware && isDeviceEnrolled;
};

/**
 * Checks if the device supports biometrics and that the user has said they want to use Biometrics
 * @returns The biometric type
 */
export const getAvailableBiometricType = async (params?: { skipStoredPreferenceCheck: boolean }) => {
  const { AuthenticationType } = LocalAuthentication;
  const isDeviceCapableAndEnrolled = await getIsDeviceBiometricsCapableAndEnrolled();
  const supportedSensors = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const hasStoredPreference = await AsyncStorage.getItem(AsyncStorageKeys.UseBiometrics);

  if (
    isDeviceCapableAndEnrolled &&
    supportedSensors.length > 0 &&
    (hasStoredPreference === 'true' || params?.skipStoredPreferenceCheck)
  ) {
    if (supportedSensors.length === 2) {
      return DeviceBiometricType.MultipleSensors;
    }
    if (supportedSensors[0] === AuthenticationType.FACIAL_RECOGNITION) {
      return DeviceBiometricType.FacialRecognition;
    }
    if (supportedSensors[0] === AuthenticationType.FINGERPRINT) {
      return DeviceBiometricType.Fingerprint;
    }
  }
  return DeviceBiometricType.NotAvailable;
};

/**
 * Returns true if user has previously stored biometric preferences
 * (i.e. both if they want to and if they don't), false otherwise
 */
export const getHasStoredBiometricPreference = async (): Promise<boolean> => {
  const hasStoredPreference = await AsyncStorage.getItem(AsyncStorageKeys.UseBiometrics);
  return hasStoredPreference !== null;
};

export const getIsBiometricsEnabled = async (): Promise<boolean> => {
  const storedPreference = await AsyncStorage.getItem(AsyncStorageKeys.UseBiometrics);
  return storedPreference === 'true';
};

export const storeBiometricsPreference = async (params: { enableBiometrics: boolean }) => {
  await AsyncStorage.setItem(AsyncStorageKeys.UseBiometrics, params.enableBiometrics ? 'true' : 'false');
};

export const deleteBiometricsPreference = async () => {
  await AsyncStorage.removeItem(AsyncStorageKeys.UseBiometrics);
};

export const promptUserForBiometricPreference = () => {
  getHasStoredBiometricPreference().then((hasStoredPreference: boolean) => {
    if (!hasStoredPreference) {
      getAvailableBiometricType({ skipStoredPreferenceCheck: true }).then((biometricType: DeviceBiometricType) => {
        if (biometricType !== DeviceBiometricType.NotAvailable) {
          const alertStrings = getEnableLoginViaBiometricsText(biometricType);
          Alert.alert(alertStrings.title, alertStrings.description, [
            { text: GeneralText.NoThanks, onPress: () => storeBiometricsPreference({ enableBiometrics: false }) },
            { text: GeneralText.Yes, onPress: () => storeBiometricsPreference({ enableBiometrics: true }) },
          ]);
        }
      });
    }
  });
};

export const promptLoginWithBiometrics = async (biometricType: DeviceBiometricType) => {
  return LocalAuthentication.authenticateAsync({ promptMessage: getLoginWithBiometricsText(biometricType) });
};
