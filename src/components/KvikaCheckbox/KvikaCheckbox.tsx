import { Colors } from '@kvika/theme';
import * as React from 'react';

import { Pressable } from 'react-native';
import Checkmark from '../../svg/Checkmark';
import { StyledCheckboxContainer, StyledCheckmarkContainer } from './KvikaCheckboxStyles';

type Props = {
  isChecked: boolean;
  onPress(): void;
  children?: React.ReactNode;
};

const KvikaCheckbox = ({ isChecked, onPress, children }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <StyledCheckboxContainer>
        <StyledCheckmarkContainer isChecked={isChecked}>
          {isChecked && <Checkmark color={Colors.white} />}
        </StyledCheckmarkContainer>
        {children}
      </StyledCheckboxContainer>
    </Pressable>
  );
};

export default KvikaCheckbox;
