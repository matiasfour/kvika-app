import { Colors } from '@kvika/theme';
import * as React from 'react';
import { Switch } from 'react-native';
import { FontWeight } from '../../../../dls/StyleGuide';
import { getLoginWithBiometricsText } from '../../../../utils/Biometrics/BiometricsText';
import { DeviceBiometricType } from '../../../../utils/Biometrics/BiometricsTypes';
import { RowContainer, StyledKvikaText } from './ProfileInfoPageStyles';

type Props = {
  isBiometricsEnabled: boolean;
  onChange: (isBiometricsEnabled: boolean) => void;
  availableBiometricType: DeviceBiometricType;
};

const BiometricsRow = ({ isBiometricsEnabled, onChange, availableBiometricType }: Props) => {
  return (
    <RowContainer>
      <StyledKvikaText color={Colors.gold150} fontWeight={FontWeight.Medium}>
        {getLoginWithBiometricsText(availableBiometricType)}
      </StyledKvikaText>
      <Switch
        trackColor={{ false: Colors.goldGray500, true: Colors.gold100 }}
        thumbColor={isBiometricsEnabled ? Colors.gold400 : Colors.black7}
        onValueChange={onChange}
        value={isBiometricsEnabled}
        style={{ transform: [{ scaleX: 0.86 }, { scaleY: 0.8 }] }}
      />
    </RowContainer>
  );
};
export default BiometricsRow;
