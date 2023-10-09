import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledLoginTabsContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding-bottom: ${Grid['16px']};
`;

type ButtonProps = {
  isSelected?: boolean;
};

export const StyledPressable = styled.Pressable<ButtonProps>`
  background-color: ${({ isSelected }) => (isSelected ? Colors.gray900 : Colors.black7)};
  margin-right: ${Grid['4px']};
  padding: 6px ${Grid['8px']};
`;
