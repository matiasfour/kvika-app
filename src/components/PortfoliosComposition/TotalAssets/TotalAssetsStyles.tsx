import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import { FontSize } from '../../../dls/StyleGuide';
import KvikaText from '../../KvikaText';

export const StyledTotalAssets = styled(KvikaText)`
  line-height: 16px;
`;

export const StyledAmount = styled(KvikaText)`
  font-size: ${FontSize.Large}px;
  line-height: 32px;
`;

export const StyledTotalAssetsContainer = styled.View`
  display: flex;
  flex-flow: column wrap;
  margin: ${Grid['24px']};
`;
