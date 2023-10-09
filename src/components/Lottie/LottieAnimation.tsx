import * as React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
  playAnimation?: boolean;
  loop?: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

const LottieAnimation = ({ source, playAnimation = false, loop = false }: Props) => {
  return (
    <LottieView
      source={source}
      style={styles.container}
      loop={loop}
      ref={(animation) => {
        animation?.reset();
        if (playAnimation) {
          animation?.play();
        }
      }}
    />
  );
};
export default LottieAnimation;
