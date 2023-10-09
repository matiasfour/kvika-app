import * as React from 'react';

import { Colors } from '@kvika/theme';

import FaceID from '../../../svg/FaceID';
import TouchID from '../../../svg/TouchID';
import { getLoginWithBiometricsText } from '../../../utils/Biometrics/BiometricsText';
import { DeviceBiometricType } from '../../../utils/Biometrics/BiometricsTypes';
import { StyledKvikaButton } from './LoginWithBiometricsButtonStyles';

type Props = {
  onPress: () => void;
  biometricType: DeviceBiometricType;
};

const LoginWithBiometricsButton = ({ onPress, biometricType }: Props) => {
  return (
    <StyledKvikaButton
      title={getLoginWithBiometricsText(biometricType)}
      icon={
        biometricType === DeviceBiometricType.FacialRecognition ? (
          <FaceID color={Colors.white} />
        ) : (
          <TouchID color={Colors.white} />
        )
      }
      large
      onPress={onPress}
      light
    />
  );
};

export default LoginWithBiometricsButton;
