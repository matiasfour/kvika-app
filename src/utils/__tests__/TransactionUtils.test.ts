import { PortfolioTransactionMovementStatusTypeEnum, PortfolioTransactionTypeEnum } from '@kvika/api-types';
import { TransactionsScreenText } from '../../constants/Text';
import { genereateMockTransactions } from '../../mocks';
import { TransactionPill } from '../../types/Types';
import { getTransactionsFilters, getFilteredTransactions, orderTransactionFilters } from '../TransactionUtils';

describe('getTransactionsFilters', () => {
  const numberOfYears = 3;
  const transactions = genereateMockTransactions(3, numberOfYears);

  const filters = getTransactionsFilters(transactions);
  it('should return all available filters', () => {
    expect(filters).toStrictEqual([
      { types: [], text: 'Allar hreyfingar' },
      {
        types: ['BUY', 'DELIVER_FREE', 'RECEIVE_FREE', 'REDEMPTION', 'SELL', 'BUY_PENDING', 'SELL_PENDING'],
        text: 'Kaup/sala',
      },
    ]);
  });

  it('should just return default filter to show all transactions', () => {
    const filters = getTransactionsFilters([]);
    expect(filters).toStrictEqual([{ types: [], text: 'Allar hreyfingar' }]);
  });
});

describe('getFilteredTransactions', () => {
  const numberOfYears = 3;
  const transactions = genereateMockTransactions(2, numberOfYears);
  const filteredTransactions = getFilteredTransactions([PortfolioTransactionTypeEnum.BUY], transactions);
  it('should return filtered transactions according to current filters', () => {
    expect(filteredTransactions).toStrictEqual([
      {
        id: 0,
        portfolioId: 0,
        instrument: {
          id: 0,
          symbol: 'MAREL',
          name: 'Marel hf',
          category: 'Funds',
          currencyCode: 'ISK',
        },
        isSettled: true,
        transactionType: 'BUY',
        tradeDate: '2022-04-01',
        settlementDate: '2022-03-01',
        quantity: 3,
        price: 105,
        currencyPrice: 130,
        commissionPercentage: 0.3,
        commission: 100,
        tradeFee: 20,
        tax: 10,
        payment: 10,
        movementStatus: PortfolioTransactionMovementStatusTypeEnum.CANCELED,
      },
      {
        id: 1,
        portfolioId: 0,
        instrument: {
          id: 0,
          symbol: 'MAREL',
          name: 'Marel hf',
          category: 'Funds',
          currencyCode: 'ISK',
        },
        isSettled: true,
        transactionType: 'BUY',
        tradeDate: '2021-03-01',
        settlementDate: '2022-03-01',
        quantity: 3,
        price: 105,
        currencyPrice: 130,
        commissionPercentage: 0.3,
        commission: 100,
        tradeFee: 20,
        tax: 10,
        payment: 10,
        movementStatus: PortfolioTransactionMovementStatusTypeEnum.CANCELED,
      },
    ]);
  });
  it('should return empty array', () => {
    const transactions = getFilteredTransactions([PortfolioTransactionTypeEnum.SELL], []);
    expect(transactions).toStrictEqual([]);
  });
});

describe('orderTransactionFilters', () => {
  it('should return a sorted array with expected elements', () => {
    const mockFilters: TransactionPill[] = [
      {
        text: TransactionsScreenText.Fee,
        types: [],
      },
      {
        text: TransactionsScreenText.InstallmentAndInterests,
        types: [],
      },
      {
        text: TransactionsScreenText.AllTransactions,
        types: [],
      },
      {
        text: TransactionsScreenText.BuyOrSell,
        types: [],
      },
      {
        text: TransactionsScreenText.Other,
        types: [],
      },
      {
        text: TransactionsScreenText.CashDividends,
        types: [],
      },
    ];
    const expectedResult: TransactionPill[] = [
      {
        text: TransactionsScreenText.AllTransactions,
        types: [],
      },
      {
        text: TransactionsScreenText.BuyOrSell,
        types: [],
      },
      {
        text: TransactionsScreenText.CashDividends,
        types: [],
      },
      {
        text: TransactionsScreenText.Fee,
        types: [],
      },
      {
        text: TransactionsScreenText.InstallmentAndInterests,
        types: [],
      },
      {
        text: TransactionsScreenText.Other,
        types: [],
      },
    ];

    expect(mockFilters).not.toStrictEqual(expectedResult);

    const mockSortedFilters: TransactionPill[] = mockFilters.sort(orderTransactionFilters);

    expect(mockSortedFilters).toStrictEqual(expectedResult);
  });
  it('should return a sorted array with unexpected elements', () => {
    const mockFilters: TransactionPill[] = [
      {
        text: TransactionsScreenText.Fee,
        types: [],
      },
      {
        text: TransactionsScreenText.InstallmentAndInterests,
        types: [],
      },
      {
        text: TransactionsScreenText.AllTransactions,
        types: [],
      },
      {
        text: TransactionsScreenText.UnprocessedTransactions,
        types: [],
      },
      {
        text: TransactionsScreenText.BuyOrSell,
        types: [],
      },
      {
        text: TransactionsScreenText.Other,
        types: [],
      },
      {
        text: TransactionsScreenText.NoTransactionsFound,
        types: [],
      },
      {
        text: TransactionsScreenText.CashDividends,
        types: [],
      },
    ];
    const expectedResult: TransactionPill[] = [
      {
        text: TransactionsScreenText.AllTransactions,
        types: [],
      },
      {
        text: TransactionsScreenText.BuyOrSell,
        types: [],
      },
      {
        text: TransactionsScreenText.CashDividends,
        types: [],
      },
      {
        text: TransactionsScreenText.Fee,
        types: [],
      },
      {
        text: TransactionsScreenText.InstallmentAndInterests,
        types: [],
      },
      {
        text: TransactionsScreenText.Other,
        types: [],
      },
      {
        text: TransactionsScreenText.NoTransactionsFound,
        types: [],
      },
      {
        text: TransactionsScreenText.UnprocessedTransactions,
        types: [],
      },
    ];

    expect(mockFilters).not.toStrictEqual(expectedResult);

    const mockSortedFilters: TransactionPill[] = mockFilters.sort(orderTransactionFilters);

    expect(mockSortedFilters).toStrictEqual(expectedResult);
  });
});
