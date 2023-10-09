import { Platform } from 'react-native';
import { DeviceBiometricType } from './BiometricsTypes';

export enum BiometricStrings {
  TouchID = 'Touch ID',
  FaceID = 'Face ID',
  BiometricID = 'Biometric auðkenni',
  FingerprintAlt = 'fingrafari',
  FaceAlt = 'andliti',
  EnableFaceID = 'Virkja Face ID?',
  EnableFaceIDDescription = 'Viltu nota Face ID til að auðkenna þig fyrir Kviku appið?',
  EnableTouchID = 'Virkja Touch ID?',
  EnableTouchIDDescription = 'Viltu nota Touch ID til að auðkenna þig fyrir Kviku appið?',
  EnableFace = 'Virkja innskráningu með andlitsgreiningu?',
  EnableFaceDescription = 'Viltu nota andlitsgreiningu til að auðkenna þig fyrir Kviku appið?',
  EnableTouch = 'Virkja innskráningu með fingrafari?',
  EnableTouchDescription = 'Viltu nota fingrafar til að auðkenna þig fyrir Kviku appið?',
  EnableBiometricID = 'Virkja innskráningu með biometric auðkenni?',
  EnableBiometricIDDescription = 'Viltu nota biometric auðkenni til að auðkenna þig fyrir Kviku appið?',
}

export const getEnableLoginViaBiometricsText = (type: DeviceBiometricType) => {
  const { Fingerprint, FacialRecognition } = DeviceBiometricType;
  const isAndroid = Platform.OS === 'android';
  switch (type) {
    case Fingerprint: {
      return isAndroid
        ? { title: BiometricStrings.EnableTouch, description: BiometricStrings.EnableTouchDescription }
        : { title: BiometricStrings.EnableTouchID, description: BiometricStrings.EnableTouchIDDescription };
      break;
    }
    case FacialRecognition: {
      return isAndroid
        ? { title: BiometricStrings.EnableFace, description: BiometricStrings.EnableFaceDescription }
        : { title: BiometricStrings.EnableFaceID, description: BiometricStrings.EnableFaceIDDescription };
      break;
    }
    default: {
      return {
        title: BiometricStrings.EnableBiometricID,
        description: BiometricStrings.EnableBiometricIDDescription,
      };
    }
  }
};

const getBiometricTypeTextInSentence = (biometricType: DeviceBiometricType) => {
  switch (biometricType) {
    case DeviceBiometricType.Fingerprint:
      return Platform.OS === 'ios' ? BiometricStrings.TouchID : BiometricStrings.FingerprintAlt;
    case DeviceBiometricType.FacialRecognition:
      return Platform.OS === 'ios' ? BiometricStrings.FaceID : BiometricStrings.FaceAlt;
    case DeviceBiometricType.MultipleSensors:
      return BiometricStrings.BiometricID;
    case DeviceBiometricType.NotAvailable:
    default:
      return '';
  }
};

export const getLoginWithBiometricsOrEIDText = (biometricType: DeviceBiometricType) => {
  const biometricTypeText = getBiometricTypeTextInSentence(biometricType);
  return `Skráðu þig inn með ${biometricTypeText} eða rafrænum skilríkjum`;
};

export const getLoginWithBiometricsText = (biometricType: DeviceBiometricType) => {
  return `Innskrá með ${getBiometricTypeTextInSentence(biometricType)}`;
};
