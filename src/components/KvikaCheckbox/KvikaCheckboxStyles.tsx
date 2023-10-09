import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';

type CheckmarkContainerProps = { isChecked: boolean };

export const StyledCheckmarkContainer = styled.View<CheckmarkContainerProps>`
  height: ${Grid['24px']};
  width: ${Grid['24px']};
  background: ${Colors.white};
  border-radius: ${Grid['4px']};
  justify-content: center;
  align-items: center;
  margin-right: ${Grid['16px']};
  background-color: ${({ isChecked }) => (isChecked ? Colors.gold550 : Colors.white)};
  border-color: ${({ isChecked }) => (isChecked ? 'transparent' : Colors.gray800)};
  border-width: 1px;
  border-style: solid;
`;

export const StyledCheckboxContainer = styled.View`
  padding: 12px;
  display: flex;
  flex-direction: row;
`;
