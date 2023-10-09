import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaText from '../../components/KvikaText';

export const StyledLogin = styled.View`
  padding: ${Grid['16px']};
  flex: 1;
`;

export const StyledHeaderContainer = styled.View`
  flex: 1;
`;

export const StyledLoginText = styled(KvikaText)`
  margin-bottom: ${Grid['8px']};
`;
