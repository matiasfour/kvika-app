import * as React from 'react';

import { StyledPressable, StyledView } from './NumpadButtonStyles';

type Props = {
  children: React.ReactNode;
  onPress?(): void;
  disabled?: boolean;
};

const NumpadButton = ({ children, onPress, disabled = false }: Props) => {
  return (
    <StyledPressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => <StyledView pressed={pressed}>{children}</StyledView>}
    </StyledPressable>
  );
};

export default NumpadButton;
