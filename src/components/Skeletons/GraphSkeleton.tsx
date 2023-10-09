import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from './SkeletonStyles';
import { SkeletonWrapper } from './SkeletonWrapper';
import { StyledSkeletonContent } from './StyledSkeletonContent';

type GraphSkeletonProps = {
  isLoading: boolean;
  showPercentage?: boolean;
};

export const GraphSkeleton = ({ isLoading, showPercentage = false }: GraphSkeletonProps) => {
  return (
    <SkeletonWrapper>
      <View style={Styles.flexContainer}>
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.interests, SkeletonStyles.date]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.largeNumber, showPercentage ? SkeletonStyles.percentage : {}]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.centerRow}
          layout={[SkeletonStyles.graph]}
        />
      </View>
    </SkeletonWrapper>
  );
};

const SkeletonStyles = StyleSheet.create({
  interests: {
    key: 'interests',
    width: '30%',
    height: 16,
  },
  date: { key: 'date', width: '40%', height: 16 },
  largeNumber: { key: 'largeNumber', width: '50%', height: 32 },
  percentage: {
    key: 'percentage',
    display: 'flex',
    width: '15%',
    height: 20,
    alignSelf: 'flex-start',
  },
  graph: { key: 'graph', width: '100%', height: 250 },
});
