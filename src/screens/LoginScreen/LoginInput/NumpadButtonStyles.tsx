import styled from 'styled-components/native';
import { Colors, Grid } from '@kvika/theme';

export const StyledPressable = styled.Pressable`
  flex: 1;
  flex-direction: row;
  margin: ${Grid['4px']};
  align-items: center;
  justify-content: center;
`;

export const StyledView = styled.View<{ pressed: boolean }>`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${Grid['4px']};
  background-color: ${({ pressed }) => (pressed ? Colors.gray900 : Colors.black7)};
`;
