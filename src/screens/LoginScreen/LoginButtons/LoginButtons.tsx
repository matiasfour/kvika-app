import * as React from 'react';

import LoginWithBiometricsButton from './LoginWithBiometricsButton';
import { DeviceBiometricType } from '../../../utils/Biometrics/BiometricsTypes';
import { StyledView } from './LoginButtonsStyles';
import KvikaButton from '../../../components/KvikaButton/KvikaButton';
import { LoginScreenText } from '../../../constants/Text';

type Props = {
  onPressEID: () => void;
  onPressBiometrics: () => void;
  biometricType: DeviceBiometricType;
};

const LoginButtons = ({ onPressEID, onPressBiometrics, biometricType }: Props) => {
  return (
    <StyledView>
      <KvikaButton title={LoginScreenText.Login} onPress={onPressEID} />
      <LoginWithBiometricsButton onPress={onPressBiometrics} biometricType={biometricType} />
    </StyledView>
  );
};

export default LoginButtons;
