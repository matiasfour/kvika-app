import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Colors } from '@kvika/theme';
import { TransactionsScreenText } from '../../../constants/Text';
import { StyledContainer } from './SummaryStyles';
import { selectIsLoadingPortfoliosPerformance, selectPortfoliosPerformance } from '../../../store/portfolio';
import { TransactionSummarySkeleton } from '../../../components/Skeletons/TransactionSummarySkeleton';
import { selectPeriod, selectPortfolioIds } from '../../../store/ppid';
import { handleGetPortfoliosPerformance } from '../../../utils/ApiClientUtils';
import NoDataContainer from '../../../components/NoDataContainer';
import SummaryRows from './SummaryRows';

const Summary = () => {
  const portfoliosPerformance = useSelector(selectPortfoliosPerformance);
  const isLoading = useSelector(selectIsLoadingPortfoliosPerformance);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const showSkeleton = isLoading || isRefreshing;
  const dispatch = useDispatch();
  const period = useSelector(selectPeriod);
  const portfolioIds = useSelector(selectPortfolioIds);
  const hasData = portfoliosPerformance && portfoliosPerformance.holdings.length > 0;

  const refreshData = React.useCallback(() => {
    setIsRefreshing(true);
    handleGetPortfoliosPerformance(dispatch, period, portfolioIds, () => {
      setIsRefreshing(false);
    });
  }, [dispatch, period, portfolioIds]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshData}
          tintColor={Colors.gold200}
          colors={[Colors.gold200]}
        />
      }
    >
      {showSkeleton ? (
        <TransactionSummarySkeleton isLoading />
      ) : (
        <View>
          {hasData ? (
            <StyledContainer>
              <SummaryRows portfoliosPerformance={portfoliosPerformance} />
            </StyledContainer>
          ) : (
            <NoDataContainer
              errorMsg={`${TransactionsScreenText.NoTransactionsFound}\n${TransactionsScreenText.ChooseAnotherPeriod}`}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default Summary;
