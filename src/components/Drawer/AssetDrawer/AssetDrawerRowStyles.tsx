import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 12px;
`;

export const StyledAssetCompositionContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: ${Grid['16px']};
`;
