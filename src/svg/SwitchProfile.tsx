import { Colors } from '@kvika/theme';
import * as React from 'react';

import { Path } from 'react-native-svg';

import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const SwitchProfile = (props: SVGProps) => {
  return (
    <IconWrapper {...props}>
      <Path
        d="m1.496 11.254 1.5-1.5 1.5 1.5m18.008 1.496-1.5 1.5-1.5-1.5M4.673 6.788a8.99 8.99 0 0 1 16.108 7.203m-1.46 3.221A8.99 8.99 0 0 1 3.213 10.01m12.788 5.993a2.105 2.105 0 0 0-.529-.77 2.109 2.109 0 0 0-1.434-.564H9.962a2.112 2.112 0 0 0-1.964 1.334m6.253-5.753a2.251 2.251 0 1 1-4.502 0 2.251 2.251 0 0 1 4.502 0Z"
        stroke={Colors.gold400}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWrapper>
  );
};

export default SwitchProfile;
