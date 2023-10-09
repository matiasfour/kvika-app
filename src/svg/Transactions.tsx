import * as React from 'react';
import { Path } from 'react-native-svg';
import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const Transactions = (props: SVGProps) => {
  const { color } = props;

  return (
    <IconWrapper {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m8 4.586 3.707 3.707-1.414 1.414L9 8.414V16H7V8.414L5.707 9.707 4.293 8.293 8 4.586ZM16 19.414l-3.707-3.707 1.414-1.414L15 15.586V8h2v7.586l1.293-1.293 1.414 1.414L16 19.414Z"
        fill={color}
      />
    </IconWrapper>
  );
};

export default Transactions;
