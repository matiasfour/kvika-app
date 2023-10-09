import * as React from 'react';

import { Path } from 'react-native-svg';

import IconWrapper from './IconWrapper';
import { SVGProps } from '../types/Types';

const Overview = (props: SVGProps) => {
  const { color } = props;
  return (
    <IconWrapper {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.834 6.166a8.25 8.25 0 0 0-11.667 0 8.25 8.25 0 0 0 0 11.668 8.25 8.25 0 0 0 11.667 0 8.25 8.25 0 0 0 0-11.668ZM5.106 5.106a9.75 9.75 0 0 1 13.789 0 9.75 9.75 0 0 1 0 13.788 9.75 9.75 0 0 1-13.79 0 9.75 9.75 0 0 1 0-13.788Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m16.569 7.431-1.958 7.18-7.18 1.958 1.958-7.18 7.18-1.958Zm-5.958 3.18-1.042 3.82 3.82-1.042 1.042-3.82-3.82 1.042Z"
        fill={color}
      />
      <Path d="M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill={color} />
    </IconWrapper>
  );
};

export default Overview;
