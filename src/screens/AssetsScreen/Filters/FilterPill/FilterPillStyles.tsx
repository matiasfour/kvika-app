import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';

type FilterPillProps = {
  isSelected?: boolean;
};

export const StyledFilterPill = styled.Pressable<FilterPillProps>`
  display: flex;
  background-color: ${({ isSelected }) => (isSelected ? Colors.gray900 : Colors.black7)};
  padding: 6px ${Grid['8px']};
  border-radius: ${Grid['2px']};
  margin-right: ${Grid['4px']};
`;
