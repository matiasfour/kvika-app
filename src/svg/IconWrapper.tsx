import * as React from 'react';

import Svg from 'react-native-svg';
import { SVGProps } from '../types/Types';

const IconWrapper = ({
  title,
  titleId,
  width,
  height,
  vbHeight,
  vbWidth,
  color,
  fillWithColor = true,
  children,
}: SVGProps & { children: React.ReactNode }) => (
  <Svg
    viewBox={`0 0 ${vbHeight ?? '24'} ${vbWidth ?? '24'}`}
    width={width}
    height={height}
    fill={fillWithColor ? color : undefined}
    aria-labelledby={titleId}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    {children}
  </Svg>
);

export default IconWrapper;
