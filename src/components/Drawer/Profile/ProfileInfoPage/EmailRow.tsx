import { Colors } from '@kvika/theme';
import React from 'react';
import { ProfileDrawerText } from '../../../../constants/Text';
import { FontWeight } from '../../../../dls/StyleGuide';
import { getColorWithOpacity } from '../../../../utils/Utils';
import KvikaText from '../../../KvikaText';
import { RowContainer } from './ProfileInfoPageStyles';

type Props = {
  email: string;
};

export const EmailRow = ({ email }: Props) => {
  return (
    <RowContainer style={{ borderTopColor: getColorWithOpacity(Colors.gold150, 40), borderTopWidth: 1 }}>
      <KvikaText color={Colors.gold150} fontWeight={FontWeight.Medium}>
        {ProfileDrawerText.Email}
      </KvikaText>
      <KvikaText color={Colors.gold150}>{email}</KvikaText>
    </RowContainer>
  );
};

export default EmailRow;
