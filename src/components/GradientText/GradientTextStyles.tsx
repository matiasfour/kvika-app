import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type MaskedViewProps = {
  width: string;
};

export const StyledMaskedView = styled(MaskedView)<MaskedViewProps>`
  width: ${({ width }) => width};
`;

export const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  position: absolute;
  width: 90%;
  height: 100%;
`;
