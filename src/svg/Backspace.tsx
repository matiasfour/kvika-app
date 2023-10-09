import * as React from 'react';

import { Path } from 'react-native-svg';

import IconWrapper from './IconWrapper';
import { SVGProps } from '../types/Types';

const Backspace = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m8.03 7-3.572 5 3.571 5H20V7H8.03Zm-.515-2a1 1 0 0 0-.814.419l-4.286 6a1 1 0 0 0 0 1.162l4.286 6a1 1 0 0 0 .814.419H21a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H7.515Z"
    />
    <Path fillRule="evenodd" clipRule="evenodd" d="m17.207 9.707-6 6-1.414-1.414 6-6 1.414 1.414Z" />
    <Path fillRule="evenodd" clipRule="evenodd" d="m11.207 8.293 6 6-1.414 1.414-6-6 1.414-1.414Z" />
  </IconWrapper>
);

export default Backspace;
