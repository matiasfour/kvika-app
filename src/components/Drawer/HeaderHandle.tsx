import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetHandle, BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import { Colors } from '@kvika/theme';

export interface HeaderHandleProps extends BottomSheetHandleProps {
  children?: string | React.ReactNode | React.ReactNode[];
}

const HeaderHandleComponent = (props: HeaderHandleProps) => {
  return <BottomSheetHandle style={styles.container} indicatorStyle={styles.indicator} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.075)',
    zIndex: 99999,
    backgroundColor: Colors.black11,
  },
  indicator: {
    height: 4,
    opacity: 0.5,
  },
});

export const HeaderHandle = memo(HeaderHandleComponent);
