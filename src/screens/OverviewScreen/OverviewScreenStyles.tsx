import styled from 'styled-components/native';
import { Colors, Grid } from '@kvika/theme';
import { ScrollView } from 'react-native-gesture-handler';

export const StyledGHScrollView = styled(ScrollView)`
  flex: 1;
  background-color: ${Colors.black3};
`;

export const StyledOverviewItemWrapper = styled.View`
  background-color: ${Colors.black7};
  margin-top: ${Grid['2px']};
  width: 100%;
`;

export const StyledNoDataContainerWrapper = styled.View`
  padding-top: ${Grid['4px']};
`;
