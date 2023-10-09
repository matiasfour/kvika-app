import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import { INSTRUMENT_CANVAS_HEIGHT } from '../../../constants/GraphConstants';
import KvikaText from '../../KvikaText';

export const StyledNoDataContainer = styled.View`
  height: ${INSTRUMENT_CANVAS_HEIGHT}px;
`;

export const StyledNoDataContent = styled.View`
  margin-left: ${Grid['16px']};
`;

export const StyledNoDataDescription = styled(KvikaText)`
  margin-top: ${Grid['8px']};
`;
