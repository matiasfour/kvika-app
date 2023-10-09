import { Colors } from '@kvika/theme';
import * as React from 'react';

import { View, StyleSheet } from 'react-native';
import { ErrorStrings } from '../constants/Text';
import KvikaText from './KvikaText';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginTop: 64,
    marginRight: 54,
    marginLeft: 54,
  },
});

type Props = {
  errorMsg?: string;
};

const NoDataContainer = ({ errorMsg = ErrorStrings.ErrorMessage }: Props) => {
  return (
    <View style={styles.container}>
      <KvikaText color={Colors.goldGray400}>{errorMsg}</KvikaText>
    </View>
  );
};

export default NoDataContainer;
