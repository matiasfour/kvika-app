import { Grid } from '@kvika/theme';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainer = styled.ScrollView`
  max-height: ${Dimensions.get('window').height}px;
  padding: ${Grid['16px']};
  flex: 1;
`;

export const StyledDescription = styled.View`
  padding-top: ${Grid['8px']};
  padding-bottom: 40px;
`;

export const StyledRow = styled.View`
  padding-bottom: ${Grid['24px']};
  display: flex;
  flex-direction: row;
`;

export const StyledButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${Grid['16px']};
  padding: ${Grid['16px']};
`;
