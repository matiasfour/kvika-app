import * as React from 'react';
import { useSharedValue, withTiming, useAnimatedProps, runOnJS, interpolate } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { BASE_ANIMATION_SPEED } from '../../constants/GeneralConstants';
import { selectAppStateStatus } from '../../store/appStateStatus';
import { StyledAnimatedBlurView, StyledAnimatedLottieView, StyledLottieContainer } from './IOSSecurityOverlayStyles';

const MAX_BACKGROUND_BLUR = 50;

const IOSSecurityOverlay = () => {
  const blurIntensity = useSharedValue(0);
  const [isBlurred, setIsBlurred] = React.useState(false);
  const appState = useSelector(selectAppStateStatus);

  const showOverlay = isBlurred || appState.currStatus === 'inactive' || appState.currStatus === 'background';

  React.useEffect(() => {
    if (appState.currStatus === 'inactive' || appState.currStatus === 'background') {
      setIsBlurred(true);
      blurIntensity.value = withTiming(MAX_BACKGROUND_BLUR, { duration: BASE_ANIMATION_SPEED });
    } else {
      blurIntensity.value = withTiming(0, { duration: BASE_ANIMATION_SPEED }, () => {
        runOnJS(setIsBlurred)(false);
      });
    }
  }, [blurIntensity, appState, showOverlay]);

  const animatedBlurViewProps = useAnimatedProps(() => {
    return {
      intensity: blurIntensity.value,
    };
  });

  const animatedLottieViewProps = useAnimatedProps(() => {
    return {
      progress: interpolate(blurIntensity.value, [0, MAX_BACKGROUND_BLUR], [0, 1]),
    };
  });

  return showOverlay ? (
    <>
      <StyledAnimatedBlurView tint="dark" animatedProps={animatedBlurViewProps} />
      <StyledLottieContainer>
        <StyledAnimatedLottieView
          source={require('../../../assets/lottie/kvika_logo_splash.json')}
          animatedProps={animatedLottieViewProps}
        />
      </StyledLottieContainer>
    </>
  ) : null;
};

export default IOSSecurityOverlay;
