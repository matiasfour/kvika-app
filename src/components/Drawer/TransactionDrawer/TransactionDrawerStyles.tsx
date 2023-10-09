import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledView = styled.View`
  display: flex;
  flex: 1;
  padding: ${Grid['16px']};
  padding-bottom: ${Grid['64px']};
`;

export const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 12px;
`;

export const StyledHeaderRow = styled.View`
  padding-bottom: ${Grid['16px']};
`;

export const StyledHeaderPills = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: ${Grid['2px']};
`;
