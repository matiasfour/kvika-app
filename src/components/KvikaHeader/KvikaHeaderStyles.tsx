import styled from 'styled-components/native';
import { Colors, Grid } from '@kvika/theme';
import { Animated } from 'react-native';
import KvikaButton from '../KvikaButton/KvikaButton';

export const StyledHeader = styled.View`
  display: flex;
  width: 100%;
  height: ${Grid['64px']};
  background-color: ${Colors.black5};
  flex-direction: row;
  align-items: center;
  padding-right: ${Grid['16px']};
  padding-left: ${Grid['16px']};
`;

export const StyledLogo = styled.Pressable`
  width: ${Grid['32px']};
  height: ${Grid['32px']};
  margin-top: ${Grid['16px']};
  margin-bottom: ${Grid['16px']};
  margin-right: ${Grid['32px']};
`;

type CircleContainerProps = {
  pressed: boolean;
};

export const StyledCircleContainer = styled.View<CircleContainerProps>`
  width: 48px;
  height: 48px;
  background-color: ${({ pressed }) => (pressed ? Colors.gray900 : Colors.black5)};
  align-items: center;
  justify-content: center;
  border-radius: ${Grid['4px']};
`;

export const StyledCharCircle = styled.View`
  width: ${Grid['32px']};
  height: ${Grid['32px']};
  border-radius: ${Grid['24px']};
  align-items: center;
  justify-content: center;
  border-color: ${Colors.gold400};
  border-width: 1.5px;
`;

export const StyledNotificationBubble = styled(Animated.View)`
  width: 12px;
  height: 12px;
  position: absolute;
  background-color: ${Colors.error400};
  border-radius: 10px;
  right: 5px;
  top: 5px;
`;

export const StyledKvikaButton = styled(KvikaButton)`
  margin-left: ${Grid['8px']};
  margin-right: ${Grid['8px']};
`;
