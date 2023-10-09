import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  flex-direction: row;
  width: 100%;
  background-color: ${Colors.black5};
`;

type TabsProps = {
  color?: Colors;
};

export const StyledPressable = styled.Pressable<TabsProps>`
  flex: 1;
  align-items: center;
  margin-right: 2px;
  height: ${Grid['32px']};
  border-bottom-color: ${({ color }) => color};
  border-bottom-width: 2px;
  justify-content: center;
`;
