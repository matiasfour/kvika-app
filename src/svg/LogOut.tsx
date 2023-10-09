import * as React from 'react';

import { Path } from 'react-native-svg';
import { Colors } from '@kvika/theme';

import IconWrapper from './IconWrapper';
import { SVGProps } from '../types/Types';

const LogOut = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 4h9a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8.836v-2H18V6h-8V4Zm.641 4.873L8.414 11.1h7.268v2H8.414l2.227 2.227-1.414 1.414-3.934-3.934a1 1 0 0 1 0-1.414l3.934-3.934 1.414 1.414Z"
      fill={Colors.gold400}
    />
  </IconWrapper>
);

export default LogOut;
