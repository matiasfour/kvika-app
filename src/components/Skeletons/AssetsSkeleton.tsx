import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from './SkeletonStyles';
import { SkeletonWrapper } from './SkeletonWrapper';
import { StyledSkeletonContent } from './StyledSkeletonContent';

type AssetsSummarySkeletonProps = {
  isLoading: boolean;
};

export const AssetsSkeleton = ({ isLoading }: AssetsSummarySkeletonProps) => {
  return (
    <SkeletonWrapper>
      <View style={Styles.flexContainer}>
        {Array.from({ length: 10 }, (_, index) => (
          <StyledSkeletonContent
            key={`asset-skeleton-${index}`}
            isLoading={isLoading}
            containerStyle={Styles.spaceBetweenRow}
            layout={[{ key: `asset${index}`, ...SkeletonStyles.asset }]}
          />
        ))}
      </View>
    </SkeletonWrapper>
  );
};

const SkeletonStyles = StyleSheet.create({
  asset: {
    width: '100%',
    height: 64,
    marginBottom: 4,
  },
});
