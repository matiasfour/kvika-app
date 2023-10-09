import * as React from 'react';
import KvikaText from '../KvikaText';
import { StyledRadioButton, StyledRing } from './KvikaRadioButtonStyles';

type Props = { isChecked: boolean; label: string; onChange: (isChecked: boolean) => void };

const KvikaRadioButton = ({ isChecked, label, onChange }: Props) => {
  return (
    <StyledRadioButton onPress={() => onChange(!isChecked)}>
      <StyledRing isChecked={isChecked} />
      <KvikaText>{label}</KvikaText>
    </StyledRadioButton>
  );
};
export default KvikaRadioButton;
