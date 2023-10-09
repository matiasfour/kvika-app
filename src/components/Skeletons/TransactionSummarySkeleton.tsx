import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from './SkeletonStyles';
import { SkeletonWrapper } from './SkeletonWrapper';
import { StyledSkeletonContent } from './StyledSkeletonContent';

type TransactionSummarySkeletonProps = {
  isLoading: boolean;
};

export const TransactionSummarySkeleton = ({ isLoading }: TransactionSummarySkeletonProps) => {
  return (
    <SkeletonWrapper>
      <View style={Styles.flexContainerWithBackground}>
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.marketValueLabel, SkeletonStyles.marketValue]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.incomeLabel, SkeletonStyles.income]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.outcomeLabel, SkeletonStyles.outcome]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.realizedGainLabel, SkeletonStyles.realizedGain]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.unrealizedGainLabel, SkeletonStyles.unrealizedGain]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.taxLabel, SkeletonStyles.tax]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.marketValueEndOfPeriodLabel, SkeletonStyles.marketValueEndOfPeriod]}
        />
        <StyledSkeletonContent
          isLoading={isLoading}
          containerStyle={Styles.spaceBetweenRow}
          layout={[SkeletonStyles.interestsLabel, SkeletonStyles.interests]}
        />
      </View>
    </SkeletonWrapper>
  );
};

const SkeletonStyles = StyleSheet.create({
  marketValueLabel: {
    key: 'marketValueLabel',
    width: '55%',
    height: 24,
    marginBottom: 32,
  },
  marketValue: { key: 'marketValue', width: '30%', height: 24, marginBottom: 32 },
  incomeLabel: { key: 'incomeLabel', width: '30%', height: 16, margin: 8 },
  income: { key: 'income', width: '40%', height: 16, margin: 8 },
  outcomeLabel: { key: 'outcomeLabel', width: '28%', height: 16, margin: 8 },
  outcome: { key: 'outcome', width: '42%', height: 16, margin: 8 },
  realizedGainLabel: { key: 'realizedGainLabel', width: '40%', height: 16, margin: 8 },
  realizedGain: { key: 'realizedGain', width: '30%', height: 16, margin: 8 },
  unrealizedGainLabel: { key: 'unrealizedGainLabel', width: '42%', height: 16, margin: 8 },
  unrealizedGain: { key: 'unrealizedGain', width: '35%', height: 16, margin: 8 },
  taxLabel: { key: 'taxLabel', width: '60%', height: 16, margin: 8 },
  tax: { key: 'tax', width: '25%', height: 16, margin: 8 },
  marketValueEndOfPeriodLabel: { key: 'marketValueEndOfPeriodLabel', width: '55%', height: 24, marginTop: 32 },
  marketValueEndOfPeriod: { key: 'marketValueEndOfPeriod', width: '30%', height: 24, marginTop: 32 },
  interestsLabel: { key: 'interestsLabel', width: '30%', height: 24 },
  interests: { key: 'interests', width: '15%', height: 24 },
});
