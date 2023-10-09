import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledLayout = styled.ScrollView`
  flex: 1;
`;

export const StyledTotalValue = styled.View`
  display: flex;
  background-color: ${Colors.black5};
  flex-direction: row;
  padding: ${Grid['8px']} ${Grid['16px']} 12px;
  height: 44px;
  margin-bottom: ${Grid['2px']};
  justify-content: space-between;
`;
