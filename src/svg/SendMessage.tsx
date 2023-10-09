import * as React from 'react';
import { Path } from 'react-native-svg';
import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const SendMessage = (props: SVGProps) => {
  const { color } = props;

  return (
    <IconWrapper {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.821 4.25h16.052c1.458 0 2.359 1.59 1.607 2.84l-8.51 14.185-3.067-.498-1.834-8.252-5.428-5.428 1.18-2.847Zm5.787 8.286 1.539 6.923 1.06.172 7.587-12.647-10.186 5.552Zm9.316-6.786h-14.1l-.413.995 4.476 4.476L18.924 5.75Z"
        fill={color}
      />
    </IconWrapper>
  );
};

export default SendMessage;
