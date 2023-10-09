import { Colors } from '@kvika/theme';
import * as React from 'react';
import { Path } from 'react-native-svg';
import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const KvikaLogo = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50.2002 87.9H62.8002V66.6L50.2002 58.5V87.9Z"
      fill={Colors.gold400}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.0996 75.3999H37.6996V50.0999L25.0996 41.8999V75.3999Z"
      fill={Colors.gold400}
    />
    <Path fillRule="evenodd" clipRule="evenodd" d="M0 62.8002H12.6V33.5002L0 25.2002V62.8002Z" fill={Colors.gold400} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5996 12.6001V33.5001L25.0996 41.9001V12.6001H12.5996Z"
      fill={Colors.gold400}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M62.8002 12.7V66.7L75.4002 75.2V12.7H62.8002Z"
      fill={Colors.gold400}
    />
    <Path fillRule="evenodd" clipRule="evenodd" d="M37.7002 0V50.1L50.2002 58.5V0H37.7002Z" fill={Colors.gold400} />
  </IconWrapper>
);

export default KvikaLogo;
