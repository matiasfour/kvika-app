import { Colors } from '@kvika/theme';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.black5};
`;

export const StyledView = styled.View`
  flex: 1;
  width: ${Dimensions.get('window').width / 3}px;
`;

export const StyledLogo = styled.Image`
  flex: 1;
  width: 100%;
`;
