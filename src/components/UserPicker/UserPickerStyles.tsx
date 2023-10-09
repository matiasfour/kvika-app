import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledRow = styled.View`
  padding-bottom: ${Grid['24px']};
  display: flex;
  flex-direction: row;
`;

export const StyledView = styled.View`
  display: flex;
  flex: 1;
`;

export const StyledContentContainer = styled.ScrollView`
  display: flex;
  flex: 1;
  margin: ${Grid['16px']} 0 0 0;
`;
