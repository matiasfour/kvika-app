import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from './SkeletonStyles';
import { SkeletonWrapper } from './SkeletonWrapper';
import { StyledSkeletonContent } from './StyledSkeletonContent';

type Props = {
  isLoading: boolean;
};

export const AssetCompositionSkeleton = ({ isLoading }: Props) => {
  return (
    <SkeletonWrapper>
      <View style={Styles.flexContainer}>
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.flexStartRow}
          layout={[SkeletonStyles.title]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.chart, SkeletonStyles.summary]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.centerRow}
          layout={[
            SkeletonStyles.assetGroup1,
            SkeletonStyles.assetGroup2,
            SkeletonStyles.assetGroup3,
            SkeletonStyles.assetGroup4,
            SkeletonStyles.assetGroup5,
          ]}
        />
      </View>
    </SkeletonWrapper>
  );
};

const SkeletonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    padding: 16,
  },

  title: { key: 'title', width: '50%', height: 30 },
  summary: { key: 'summary', width: '50%', height: 45 },
  chart: { key: 'chart', width: 150, height: 150, borderRadius: 100 },
  assetGroup1: { key: 'asssetGroup1', width: '100%', height: 30, marginBottom: 16 },
  assetGroup2: { key: 'asssetGroup2', width: '100%', height: 30, marginBottom: 16 },
  assetGroup3: { key: 'asssetGroup3', width: '100%', height: 30, marginBottom: 16 },
  assetGroup4: { key: 'asssetGroup4', width: '100%', height: 30, marginBottom: 16 },
  assetGroup5: { key: 'asssetGroup5', width: '100%', height: 30, marginBottom: 16 },
});
