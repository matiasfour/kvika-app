import { Colors } from '@kvika/theme';
import React, { FunctionComponent } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type Props = {
  height: number | string;
  color?: Colors;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
};

const KvikaSpacer: FunctionComponent<Props> = ({ height, color, opacity = 1.0, style }) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height,
          backgroundColor: color,
          opacity,
        },
        style,
      ]}
    />
  );
};

export default KvikaSpacer;
