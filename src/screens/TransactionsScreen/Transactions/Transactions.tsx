import { PortfolioTransactionSchema } from '@kvika/api-types';
import * as React from 'react';
import { Animated, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PagerView from 'react-native-pager-view';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useAnalytics } from '@segment/analytics-react-native';
import { Drawer, SegmentTrackingId, TransactionPill } from '../../../types/Types';
import { StyledContainer, StyledContent } from './TransactionsStyles';
import { TransactionsScreenText, TransactionTypesText } from '../../../constants/Text';
import { getAllTransactions, getGroupedTransactionRows, getTransactionsFilters } from '../../../utils/TransactionUtils';
import { TRANSACTION_GROUPS } from '../../../constants/TransactionsConstants';
import BottomDrawer from '../../../components/Drawer/BottomDrawer/BottomDrawer';
import TransactionDrawer from '../../../components/Drawer/TransactionDrawer/TransactionDrawer';
import KvikaPillList from '../../../components/KvikaPillList/KvikaPillList';
import TransactionsFlashList from './TransactionsFlashList';
import { selectPeriod, selectPortfolioIds } from '../../../store/ppid';
import {
  selectTransactions,
  selectTransactionsPage,
  selectCanGetMoreTransactions,
  selectIsLoadingTransactions,
} from '../../../store/transactions';
import { handleGetPortfoliosPerformanceTransactions } from '../../../utils/ApiClientUtils';
import NoDataContainer from '../../../components/NoDataContainer';
import { TransactionsSkeleton } from '../../../components/Skeletons/TransactionsSkeleton';
import { getFlatListOffset } from '../../../utils/Utils';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const Transactions = () => {
  const dispatch = useDispatch();
  const { track } = useAnalytics();

  const transactionDrawerRef = React.useRef<BottomSheetModal>(null);
  const pagerRef = React.useRef<PagerView>(null);
  const flatListRef = React.useRef<FlatList<TransactionPill>>(null);

  const [selectedTypes, setSelectedTypes] = React.useState<TransactionPill>(TRANSACTION_GROUPS[0]);
  const [selectedTransaction, setSelectedTransaction] = React.useState<PortfolioTransactionSchema>();
  const [groupedOffsets, setGroupedOffsets] = React.useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const unsettledAndPagedTransactions = useSelector(selectTransactions);
  const allTransactions = getAllTransactions(
    unsettledAndPagedTransactions.unsettled,
    unsettledAndPagedTransactions.pagedTransactions
  );
  const canGetMoreTransactions = useSelector(selectCanGetMoreTransactions);
  const transactionsPage = useSelector(selectTransactionsPage);
  const period = useSelector(selectPeriod);
  const portfolioIds = useSelector(selectPortfolioIds);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const isLoading = useSelector(selectIsLoadingTransactions);
  const showSkeleton = isLoading && !isRefreshing;
  const filters = getTransactionsFilters([...allTransactions.unsettled, ...allTransactions.transactions]);
  const groupedTransactionRows = getGroupedTransactionRows(allTransactions, filters);
  const hasData = allTransactions && (allTransactions.transactions.length > 0 || allTransactions.unsettled.length > 0);

  const handleChangeTab = React.useCallback(
    (pill: TransactionPill) => {
      setSelectedTypes(pill);
      const transactionIndex = filters.findIndex((filter) => filter.text === pill.text);
      const normalizedIndex = transactionIndex < 0 ? 0 : transactionIndex;
      if (normalizedIndex !== currentIndex) {
        setCurrentIndex(normalizedIndex);
        flatListRef.current?.scrollToOffset({
          offset: getFlatListOffset(normalizedIndex, filters),
          animated: true,
        });
        pagerRef.current?.setPage(normalizedIndex);
      }
    },
    [currentIndex, filters]
  );

  const handleTransactionPress = React.useCallback(() => {
    if (transactionDrawerRef.current) {
      transactionDrawerRef.current.present();
    }
  }, []);

  const fetchData = React.useCallback(
    (page: number) => {
      setIsRefreshing(true);
      handleGetPortfoliosPerformanceTransactions(dispatch, period, portfolioIds, page, () => {
        setIsRefreshing(false);
      });
    },
    [dispatch, period, portfolioIds]
  );

  const handleSetOffset = (offset: number, filterKey: TransactionsScreenText | TransactionTypesText) => {
    setGroupedOffsets((prev) => ({ ...prev, [filterKey]: offset }));
  };

  if (showSkeleton) {
    return (
      <StyledContainer>
        <TransactionsSkeleton isLoading />
      </StyledContainer>
    );
  }

  if (!hasData) {
    return (
      <StyledContainer>
        <NoDataContainer
          errorMsg={`${TransactionsScreenText.NoTransactionsFound}\n${TransactionsScreenText.ChooseAnotherPeriod}`}
        />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledContent>
        <KvikaPillList
          pills={filters}
          flatListRef={flatListRef}
          selectedPill={selectedTypes}
          onSelectPill={handleChangeTab}
        />
        <AnimatedPagerView
          ref={pagerRef}
          initialPage={0}
          style={{ flex: 1 }}
          layoutDirection="ltr"
          overdrag
          onPageSelected={(event) => {
            handleChangeTab(filters[event.nativeEvent.position]);
          }}
        >
          {filters.map((filter, index) => {
            return (
              <View key={filter.text} style={{ flex: 1 }}>
                <TransactionsFlashList
                  data={groupedTransactionRows[filter.text]}
                  onTransactionPress={(transaction: PortfolioTransactionSchema) => {
                    setSelectedTransaction(transaction);
                    handleTransactionPress();
                    track(SegmentTrackingId.ViewTransactionDetails);
                  }}
                  onEndReached={() => {
                    // When the pager view is rendered, it renders multiple flash lists, one for each filter.
                    // This condition is to prevent making multiple requests for the same page (one per filter).
                    // Instead, we only make a call for the current filter.
                    if (index === currentIndex) {
                      canGetMoreTransactions && fetchData(transactionsPage);
                    }
                  }}
                  filterKey={filter.text}
                  offset={groupedOffsets[filter.text]}
                  onSetOffset={handleSetOffset}
                  isRefreshing={isRefreshing}
                  onFetchData={fetchData}
                />
              </View>
            );
          })}
        </AnimatedPagerView>
      </StyledContent>
      <BottomDrawer ref={transactionDrawerRef} name={Drawer.TRANSACTION} showFooter={false}>
        {selectedTransaction && <TransactionDrawer transaction={selectedTransaction} />}
      </BottomDrawer>
    </StyledContainer>
  );
};

export default Transactions;
