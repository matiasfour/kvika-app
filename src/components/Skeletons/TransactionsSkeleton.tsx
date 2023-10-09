import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from './SkeletonStyles';
import { SkeletonWrapper } from './SkeletonWrapper';
import { StyledSkeletonContent } from './StyledSkeletonContent';

type TransactionSummarySkeletonProps = {
  isLoading: boolean;
};

export const TransactionsSkeleton = ({ isLoading }: TransactionSummarySkeletonProps) => {
  return (
    <SkeletonWrapper>
      <View style={Styles.flexContainer}>
        {Array.from({ length: 10 }, (_, index) => (
          <StyledSkeletonContent
            key={`transaction-skeleton-${index}`}
            isLoading={isLoading}
            containerStyle={Styles.spaceBetweenRow}
            layout={[{ key: `transaction${index}`, ...SkeletonStyles.transaction }]}
          />
        ))}
      </View>
    </SkeletonWrapper>
  );
};

const SkeletonStyles = StyleSheet.create({
  transaction: {
    width: '100%',
    height: 64,
    marginBottom: 4,
  },
});
