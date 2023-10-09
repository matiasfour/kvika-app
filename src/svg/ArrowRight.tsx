import * as React from 'react';

import { Path } from 'react-native-svg';

import IconWrapper from './IconWrapper';
import { SVGProps } from '../types/Types';

const ArrowRight = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.586 6 14 4.586l6.707 6.707a1 1 0 0 1 0 1.414L14 19.414 12.586 18l5-5H3v-2h14.586l-5-5Z"
    />
  </IconWrapper>
);

export default ArrowRight;
