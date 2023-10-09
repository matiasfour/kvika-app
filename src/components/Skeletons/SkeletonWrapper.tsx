import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { isDebuggingEnabled } from '../../env/Environment';
import KvikaText from '../KvikaText';

type Props = {
  children: JSX.Element;
};

export const SkeletonWrapper = ({ children }: Props) => {
  const renderSkeleton = () => {
    if (isDebuggingEnabled()) {
      return (
        <View style={Styles.container}>
          <KvikaText>Debugging is Enabled</KvikaText>
          <KvikaText>Component goes here</KvikaText>
        </View>
      );
    }
    return children;
  };

  return renderSkeleton();
};

const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
