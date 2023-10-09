import * as React from 'react';

import { Path } from 'react-native-svg';
import { Colors } from '@kvika/theme';

import IconWrapper from './IconWrapper';
import { SVGProps } from '../types/Types';

const Folder = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m9.379 7.5-2-2H4.5v13H19a2.454 2.454 0 0 0 .5-.09V7.5H9.379ZM21 6v12.5c0 .398-.219.78-.5 1.06-.281.282-1.102.44-1.5.44H4.5A1.5 1.5 0 0 1 3 18.5V4h5l2 2h11Z"
      fill={Colors.gold400}
    />
  </IconWrapper>
);

export default Folder;
