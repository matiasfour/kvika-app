import styled from 'styled-components/native';
import { Grid } from '@kvika/theme';

import { FontSize } from '../../dls/StyleGuide';
import KvikaText from '../KvikaText';

export const StyledHeader = styled.View`
  display: flex;
  margin-bottom: ${Grid['8px']};
  padding: ${Grid['16px']};
`;

export const StyledText = styled(KvikaText)`
  margin-bottom: ${Grid['8px']};
`;

export const StyledDescription = styled(StyledText)`
  line-height: ${FontSize.Large}px;
`;

export const StyledLogo = styled.Image`
  width: ${Grid['32px']};
  height: ${Grid['32px']};
  margin-top: ${Grid['16px']};
  margin-bottom: ${Grid['16px']};
`;
