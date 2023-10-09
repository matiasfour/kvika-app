import { Colors } from '@kvika/theme';
import * as React from 'react';
import { Path } from 'react-native-svg';
import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const Calendar = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 6.5H5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5ZM5 5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5Z"
      fill={Colors.gold400}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 11.75H4v-1.5h16v1.5ZM8.25 8V3h1.5v5h-1.5Zm6 0V3h1.5v5h-1.5Z"
      fill={Colors.gold400}
    />
  </IconWrapper>
);

export default Calendar;
