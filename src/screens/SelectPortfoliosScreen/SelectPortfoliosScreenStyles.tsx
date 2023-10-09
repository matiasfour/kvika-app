import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaButton from '../../components/KvikaButton/KvikaButton';

export const StyledContainer = styled.View`
  padding: ${Grid['16px']};
  flex: 1;
`;

export const StyledButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledKvikaButton = styled(KvikaButton)`
  margin: 0 ${Grid['4px']};
`;

export const StyledLoadingContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${Grid['16px']};
`;

export const StyledErrorContainer = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  margin-top: ${Grid['64px']};
`;
