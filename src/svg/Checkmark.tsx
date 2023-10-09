import * as React from 'react';

import { Path } from 'react-native-svg';

import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const Checkmark = (props: SVGProps) => {
  const { color } = props;
  return (
    <IconWrapper {...props}>
      <Path d="M10 17a1 1 0 01-.707-.293L4.586 12 6 10.586l4 4 8-8L19.414 8l-8.707 8.707A1 1 0 0110 17z" fill={color} />
    </IconWrapper>
  );
};

export default Checkmark;
