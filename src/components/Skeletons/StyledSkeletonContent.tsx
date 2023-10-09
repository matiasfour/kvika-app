import { Colors } from '@kvika/theme';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';
import { ICustomViewStyle } from 'react-native-skeleton-content/lib/Constants';
import { getColorWithOpacity } from '../../utils/Utils';

type Props = {
  isLoading: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  layout?: ICustomViewStyle[];
  boneColor?: string;
  highlightColor?: string;
};

export const StyledSkeletonContent = ({
  isLoading,
  containerStyle,
  layout,
  boneColor = getColorWithOpacity(Colors.gold300, 0),
  highlightColor = getColorWithOpacity(Colors.gold600, 15),
}: Props) => {
  return (
    <SkeletonContent
      isLoading={isLoading}
      containerStyle={containerStyle}
      layout={layout}
      boneColor={boneColor}
      highlightColor={highlightColor}
      duration={2000}
    />
  );
};
