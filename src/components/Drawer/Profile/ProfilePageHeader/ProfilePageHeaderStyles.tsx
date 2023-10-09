import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaText from '../../../KvikaText';

export const StyledDescription = styled(KvikaText)`
  padding-top: 12px;
  padding-bottom: ${Grid['8px']};
`;

export const StyledTitle = styled(KvikaText)`
  padding-top: ${Grid['24px']};
`;
