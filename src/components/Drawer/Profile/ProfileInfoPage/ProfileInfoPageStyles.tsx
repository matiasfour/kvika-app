import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import { getColorWithOpacity } from '../../../../utils/Utils';
import KvikaText from '../../../KvikaText';

const CIRCLE_SIZE = 48;

export const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${Grid['16px']} ${Grid['8px']};
  border-bottom-color: ${getColorWithOpacity(Colors.gold150, 40)};
  border-bottom-width: 1px;
  height: 56px;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${Grid['32px']};
  margin-left: ${Grid['8px']};
  min-height: ${CIRCLE_SIZE}px;
`;

export const NameContainer = styled.View`
  justify-content: center;
`;

export const StyledCharCircle = styled.View`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: ${CIRCLE_SIZE / 2}px;
  align-items: center;
  justify-content: center;
  border-color: ${Colors.gold150};
  border-width: 0;
  background-color: ${Colors.gold150};
  margin-left: ${Grid['8px']};
  margin-right: ${Grid['16px']};
`;

type DebugRowContainerProps = {
  justifyContent?: string;
};

export const DebugRowContainer = styled.View<DebugRowContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'space-between')};
`;

export const StyledContentContainer = styled.View`
  display: flex;
  flex: 1;
  padding-top: ${Grid['24px']};
`;

export const StyledRow = styled.View`
  padding-bottom: ${Grid['24px']};
  display: flex;
  flex-direction: row;
`;

export const StyledKvikaText = styled(KvikaText)`
  max-width: 85%;
`;
