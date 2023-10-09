import * as React from 'react';
import { Path } from 'react-native-svg';
import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const TouchID = (props: SVGProps) => {
  const { color, fillWithColor, ...rest } = props;
  return (
    <IconWrapper fillWithColor={fillWithColor ?? false} color={color} {...rest}>
      <Path
        d="M8.9364 25.6099C10.2028 24.8721 11.2233 23.7032 11.7596 22.3328C12.4432 20.5876 12.3305 18.5455 11.4595 16.8869C11.0077 16.0246 10.3437 15.2034 10.3339 14.2273C10.322 13.1266 11.232 12.1495 12.2958 11.8884C13.7237 11.5385 15.2696 12.3466 16.0669 13.5871C16.8632 14.8286 17.0018 16.4059 16.7537 17.863C16.5067 19.3179 15.9077 20.6861 15.3129 22.0371C14.6683 23.5028 14.0237 24.9675 13.3792 26.4332"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.80201 23.2972C7.24618 22.7534 7.62968 22.1662 7.92001 21.5303C8.31976 20.656 8.52668 19.6572 8.33493 18.6995C8.10634 17.5588 7.34259 16.574 6.88109 15.521C5.76526 12.9828 7.21151 10.2279 9.64576 9.16619C12.4548 7.94202 16.6094 8.42736 18.6905 10.8324C20.4737 12.895 20.3166 16.067 19.8876 18.589C19.4023 21.4393 18.2247 24.1736 16.4588 26.4584"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.8354 22.3483C22.5678 20.3539 23.0401 18.237 23.195 16.1874C23.3922 13.5787 23.1636 10.4468 21.4877 8.33321C19.0567 5.26955 14.9703 4.50905 11.2968 5.20996C9.09975 5.62705 6.79767 6.66813 5.12934 8.23571C3.43825 9.82388 2.40042 11.9548 2.79042 14.5255C2.95725 15.6219 3.37109 16.6608 3.73184 17.7084C4.0915 18.756 4.4035 19.8447 4.35367 20.9519"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.2916 5.62105C20.345 1.9063 15.392 0.98547 10.9395 1.83372C8.31131 2.33422 5.55748 3.56922 3.54248 5.42714"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWrapper>
  );
};

export default TouchID;
