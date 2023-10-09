import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledPieChartContainer = styled.View`
  width: 110px;
`;

export const StyledCompositionsOverviewContainer = styled.View`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: ${Grid['16px']} 0 48px ${Grid['32px']};
`;
