import { PortfolioTransactionSchema } from '@kvika/api-types';
import { Colors } from '@kvika/theme';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { TransactionsScreenText, TransactionTypesText } from '../../../constants/Text';
import { selectIsLoadingTransactions } from '../../../store/transactions';
import Transaction from './Transaction';
import TransactionsHeader from './TransactionsHeader';

const ITEM_SIZE = 64;

type Props = {
  data: (PortfolioTransactionSchema | string)[];
  onTransactionPress: (transaction: PortfolioTransactionSchema) => void;
  stickyHeaders?: boolean;
  onEndReached: () => void;
  filterKey: TransactionsScreenText | TransactionTypesText;
  offset: number;
  onSetOffset: (offset: number, filterKey: TransactionsScreenText | TransactionTypesText) => void;
  isRefreshing: boolean;
  onFetchData: (page: number) => void;
};

const TransactionsFlashList = ({
  data,
  onTransactionPress,
  stickyHeaders = false,
  onEndReached,
  filterKey,
  offset,
  onSetOffset,
  isRefreshing,
  onFetchData,
}: Props) => {
  const flashListRef = React.useRef<FlashList<PortfolioTransactionSchema | string>>(null);
  const isLoading = useSelector(selectIsLoadingTransactions);
  const stickyHeaderIndices = React.useMemo(() => {
    return data.reduce<number[]>((acc, currRow, currIndex) => {
      if (typeof currRow === 'string') {
        acc.push(currIndex);
      }
      return acc;
    }, []);
  }, [data]);

  const renderFooter = React.useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator color={Colors.gold200} style={{ height: ITEM_SIZE }} />;
    }
    return null;
  }, [isLoading]);

  return (
    <FlashList
      ref={flashListRef}
      data={data}
      getItemType={(item: string | PortfolioTransactionSchema) => {
        return typeof item === 'string' ? 'sectionHeader' : 'row';
      }}
      renderItem={({ item }) => {
        if (typeof item === 'string') {
          return <TransactionsHeader title={item} />;
        }
        return (
          <Transaction
            transaction={item}
            onPress={() => {
              onTransactionPress(item);
            }}
          />
        );
      }}
      stickyHeaderIndices={stickyHeaders ? stickyHeaderIndices : []}
      estimatedItemSize={ITEM_SIZE}
      estimatedListSize={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      onEndReached={() => {
        onEndReached();
      }}
      onScroll={(event) => {
        onSetOffset(event.nativeEvent.contentOffset.y, filterKey);
      }}
      onLoad={() => {
        flashListRef.current?.scrollToOffset({ offset, animated: false });
      }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            onFetchData(1);
          }}
          tintColor={Colors.gold200}
          colors={[Colors.gold200]}
        />
      }
    />
  );
};

export default TransactionsFlashList;
