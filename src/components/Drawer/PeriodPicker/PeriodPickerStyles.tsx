import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaButton from '../../KvikaButton/KvikaButton';

export const StyledContainer = styled.View`
  margin: 0 12px 74px;
  display: flex;
  flex: 1;
`;

export const StyledPickerRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const StyledKvikaButton = styled(KvikaButton)`
  margin: ${Grid['4px']};
  height: 40px;
  flex-basis: 31%;
`;
