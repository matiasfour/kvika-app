import * as React from 'react';
import KvikaLoginHeader from '../../components/KvikaLoginHeader/KvikaLoginHeader';
import { LoginScreenText } from '../../constants/Text';
import { getLoginWithBiometricsOrEIDText } from '../../utils/Biometrics/BiometricsText';
import { DeviceBiometricType } from '../../utils/Biometrics/BiometricsTypes';
import { StyledHeaderContainer } from './LoginScreenStyles';

type Props = {
  showPhoneInput: boolean;
  biometricType: DeviceBiometricType;
};

const LoginHeaderContainer = ({ showPhoneInput, biometricType }: Props) => {
  const getHeaderDescription = () => {
    if (showPhoneInput) {
      return LoginScreenText.LoginWithEID;
    }
    return getLoginWithBiometricsOrEIDText(biometricType);
  };

  return (
    <StyledHeaderContainer>
      <KvikaLoginHeader
        title={LoginScreenText.Login}
        description={getHeaderDescription()}
        logo={require('../../../assets/images/icon_transparent_bg.png')}
      />
    </StyledHeaderContainer>
  );
};

export default LoginHeaderContainer;
