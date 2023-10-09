import styled, { css } from 'styled-components/native';
import { Colors, Grid } from '@kvika/theme';
import { FontSize } from '../../../dls/StyleGuide';
import KvikaText from '../../../components/KvikaText';
import KvikaButton from '../../../components/KvikaButton/KvikaButton';

export const StyledCenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledModalView = styled.View`
  margin: ${Grid['16px']};
  background-color: ${Colors.black11};
  border-radius: ${Grid['16px']};
  padding: ${Grid['24px']};
  align-items: center;
`;

const modalTextStyles = css`
  margin-bottom: 12px;
  text-align: center;
  border-bottom-color: ${Colors.gold150};
  border-bottom-width: ${Grid['2px']};
  min-width: 200px;
`;

export const StyledModalText = styled(KvikaText)`
  ${modalTextStyles}
`;

export const StyledTextInput = styled.TextInput`
  ${modalTextStyles}
  font-size: ${FontSize.XL}px;
  color: ${Colors.gold150};
`;

export const StyledButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

export const StyledButtonClose = styled(KvikaButton)`
  margin-right: ${Grid['16px']};
`;
