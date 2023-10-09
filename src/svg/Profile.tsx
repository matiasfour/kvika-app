import { Colors } from '@kvika/theme';
import * as React from 'react';
import { Path } from 'react-native-svg';
import { SVGProps } from '../types/Types';
import IconWrapper from './IconWrapper';

const Profile = (props: SVGProps) => (
  <IconWrapper {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM8.25 8a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Zm.695 6.75c-.583 0-1.16.246-1.614.714a2.763 2.763 0 0 0-.444.61c2.919 2.901 7.308 2.901 10.226 0a2.724 2.724 0 0 0-.443-.608l-.002-.002c-.452-.468-1.029-.714-1.611-.714H8.945Zm-2.692-.328c.718-.743 1.677-1.171 2.691-1.172h6.113c1.013 0 1.973.429 2.69 1.171.425.438.75.97.96 1.556l.15.42-.299.333c-3.611 4.027-9.504 4.027-13.116 0l-.299-.333.151-.421c.21-.585.536-1.116.959-1.554Z"
      fill={Colors.gold400}
    />
  </IconWrapper>
);

export default Profile;
