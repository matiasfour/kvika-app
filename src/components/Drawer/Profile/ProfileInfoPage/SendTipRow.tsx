import { Colors } from '@kvika/theme';
import * as React from 'react';
import { Linking, Pressable } from 'react-native';
import { ProfileDrawerText } from '../../../../constants/Text';
import { FontWeight } from '../../../../dls/StyleGuide';
import SendMessage from '../../../../svg/SendMessage';
import KvikaText from '../../../KvikaText';
import { RowContainer } from './ProfileInfoPageStyles';

const SendTipRow = () => {
  return (
    <RowContainer>
      <KvikaText color={Colors.gold150} fontWeight={FontWeight.Medium}>
        {ProfileDrawerText.SendATip}
      </KvikaText>
      <Pressable
        onPress={() => {
          Linking.openURL('mailto:kvika@kvika.is?subject=Kvika appið - ábending');
        }}
      >
        <SendMessage color={Colors.gold400} height={24} width={24} />
      </Pressable>
    </RowContainer>
  );
};
export default SendTipRow;
