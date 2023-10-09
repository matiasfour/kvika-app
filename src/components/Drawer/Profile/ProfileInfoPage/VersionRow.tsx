import * as React from 'react';
import { Alert, Pressable } from 'react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { Colors } from '@kvika/theme';

import KvikaText from '../../../KvikaText';
import { ProfileDrawerText } from '../../../../constants/Text';
import { FontWeight } from '../../../../dls/StyleGuide';
import { RowContainer } from './ProfileInfoPageStyles';

const VersionRow = () => {
  return (
    <RowContainer>
      <KvikaText color={Colors.gold150} fontWeight={FontWeight.Medium}>
        {ProfileDrawerText.Version}
      </KvikaText>
      <Pressable
        onPress={() => {
          Alert.alert(
            ProfileDrawerText.Version,
            `${
              Constants.manifest?.revisionId ? Constants.manifest?.revisionId : Constants.manifest?.version
            }, channel: ${Updates.channel}`
          );
        }}
      >
        <KvikaText color={Colors.gold150} fontWeight={FontWeight.Medium}>
          {Constants.manifest?.version ?? ''}
        </KvikaText>
      </Pressable>
    </RowContainer>
  );
};
export default VersionRow;
