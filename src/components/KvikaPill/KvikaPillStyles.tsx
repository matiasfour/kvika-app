import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';

type FilterPillProps = {
  small?: boolean;
  backgroundColor: Colors;
};

export const StyledPill = styled.Pressable<FilterPillProps>`
  display: flex;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ small }) => (small ? Grid['2px'] : '6px')} ${Grid['8px']};
  border-radius: ${Grid['2px']};
  margin-right: ${Grid['4px']};
`;
