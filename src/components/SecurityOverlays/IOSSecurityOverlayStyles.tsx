import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const StyledAnimatedBlurView = styled(AnimatedBlurView)`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const StyledLottieContainer = styled.View`
  background-color: transparent;
  height: 100%;
  justify-content: center;
  align-self: center;
  position: absolute;
  flex: 1;
  width: ${Dimensions.get('window').width / 3}px;
`;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export const StyledAnimatedLottieView = styled(AnimatedLottieView)`
  flex: 1;
  background-color: transparent;
`;
