import * as React from 'react';
import { Path } from 'react-native-svg';
import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const Assets = (props: SVGProps) => {
  const { color } = props;

  return (
    <IconWrapper {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.246 6.498a3.251 3.251 0 0 1 3.251-3.251h9.504a2.75 2.75 0 0 1 2.751 2.75v.25h1.251A2.75 2.75 0 0 1 21.753 9v9.504a3.251 3.251 0 0 1-3.25 3.25H5.497a3.251 3.251 0 0 1-3.25-3.25V6.498Zm1.5 1.25v10.755c0 .967.784 1.75 1.751 1.75h13.006a1.75 1.75 0 0 0 1.75-1.75V8.999c0-.691-.56-1.251-1.25-1.251H3.746Zm12.506-1.5H3.764a1.751 1.751 0 0 1 1.733-1.501h9.504c.691 0 1.251.56 1.251 1.25v.25Zm-2 7.753a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75Z"
        fill={color}
      />
    </IconWrapper>
  );
};

export default Assets;
