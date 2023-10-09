import { Colors, Grid } from '@kvika/theme';
import styled, { css } from 'styled-components/native';

type RadioButtonStyleProps = {
  isChecked: boolean;
};

export const StyledRadioButton = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const getRingStyle = ({ isChecked }: RadioButtonStyleProps) => {
  if (isChecked) {
    return css`
      border: 7px solid ${Colors.gold550};
      background: ${Colors.white};
    `;
  }

  return css`
    border: 1px solid ${Colors.goldGray500};
  `;
};

export const StyledRing = styled.View<RadioButtonStyleProps>`
  margin-right: ${Grid['16px']};
  border-radius: 12px;
  height: 24px;
  width: 24px;
  ${getRingStyle};
`;
