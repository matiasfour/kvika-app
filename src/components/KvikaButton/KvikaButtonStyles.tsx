import styled, { css } from 'styled-components/native';
import { Colors, Grid } from '@kvika/theme';

const getButtonBackgroundColor = (pressed: boolean, light?: boolean, transparent?: boolean) => {
  if (pressed) {
    return Colors.gray900;
  }
  if (light) {
    return Colors.black7;
  }
  if (transparent) {
    return 'transparent';
  }
  return Colors.black11;
};

type ButtonProps = {
  large?: boolean;
};

const getSelectedStyles = ({ selected }: ContainerProps) => {
  if (selected) {
    return css`
      border: 1px solid ${Colors.gold400};
      background-color: ${Colors.gray900};
    `;
  }
  return null;
};

export const StyledPressable = styled.Pressable<ButtonProps>`
  flex: 1;
  height: ${({ large }) => (large ? '56px' : '48px')};
  max-height: ${({ large }) => (large ? '56px' : '48px')};
  justify-content: center;
  align-items: center;
`;

type ContainerProps = {
  selected?: boolean;
  pressed: boolean;
  light?: boolean;
  transparent?: boolean;
};

export const StyledContainer = styled.View<ContainerProps>`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ pressed, light, transparent }) => getButtonBackgroundColor(pressed, light, transparent)};
  border-radius: 2px;
  ${getSelectedStyles}
`;

export const StyledIconContainer = styled.View`
  width: ${Grid['24px']};
  height: ${Grid['24px']};
`;
