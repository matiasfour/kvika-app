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

export const StyledView = styled.View`
  padding-bottom: 40px;
`;

export const StyledKvikaCheckboxContainer = styled.View`
  flex: 1;
`;

export const StyledKvikaButton = styled(KvikaButton)`
  margin-right: ${Grid['8px']};
`;
