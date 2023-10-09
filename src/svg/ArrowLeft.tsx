import * as React from 'react';

import { Path } from 'react-native-svg';

import { Colors } from '@kvika/theme';
import IconWrapper from './IconWrapper';
import { SVGProps } from '../types/Types';

const ArrowLeft = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      d="M11.414 6 10 4.586l-6.707 6.707a1 1 0 0 0 0 1.414L10 19.414 11.414 18l-5-5H21v-2H6.414l5-5Z"
      fill={Colors.gold150}
    />
  </IconWrapper>
);

export default ArrowLeft;
