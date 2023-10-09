import {
  CurrencyEnum,
  PortfolioCompositionPerformanceSchema,
  PortfolioHoldingSchema,
  PortfolioTransactionMovementStatusTypeEnum,
  PortfolioTransactionSchema,
  PortfolioTransactionTypeEnum,
} from '@kvika/api-types';
import { AssetType, Period } from '../types/Types';

export const genereateMockTransactions = (numberOfTransactions: number, numberOfYears: number) => {
  const tradeDates = ['2019-01-01', '2020-02-01', '2021-03-01', '2022-04-01'];
  const result = [];
  const usedDates = [];
  const availableDates = [...tradeDates];

  const isSettled = false;
  for (let i = 0; i < numberOfTransactions; i += 1) {
    if (usedDates.length < numberOfYears) {
      const newTradeDate = availableDates.pop();
      usedDates.push(newTradeDate);
      result.push({ ...TransactionMock, tradeDate: newTradeDate || '', isSettled: !isSettled, id: i });
    } else {
      const latestUsedDate = usedDates[usedDates.length - 1];
      result.push({ ...TransactionMock, tradeDate: latestUsedDate || '', isSettled: !isSettled, id: i });
    }
  }
  return result;
};

export const generateMockHoldings = (categories: AssetType[] | string[]): PortfolioHoldingSchema[] => {
  const result = [];
  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];
    const holding = {
      ...PortfolioHoldingMock,
      instrument: { ...PortfolioHoldingMock.instrument, categoryCode: category },
    };
    result.push(holding);
  }
  return result;
};

export const generateMockPortfolioCompositionPerformance = (categories: AssetType[] | string[]) => {
  const holdings = generateMockHoldings(categories);
  return { ...PortfolioCompositionPerformanceMock, holdings };
};

export const TransactionMock: PortfolioTransactionSchema = {
  id: 0,
  portfolioId: 0,
  instrument: {
    id: 0,
    symbol: 'MAREL',
    name: 'Marel hf',
    category: 'Funds',
    currencyCode: CurrencyEnum.ISK,
  },
  transactionType: PortfolioTransactionTypeEnum.BUY,
  tradeDate: '2022-02-01',
  settlementDate: '2022-03-01',
  quantity: 3,
  price: 105,
  currencyPrice: 130,
  commissionPercentage: 0.3,
  commission: 100,
  tradeFee: 20,
  tax: 10,
  payment: 10,
  // TODO: Setting movementStatus to Canceled just as a placeholder, until it is clear how we're going to handle this
  movementStatus: PortfolioTransactionMovementStatusTypeEnum.CANCELED,
};

export const PortfolioHoldingMock: PortfolioHoldingSchema = {
  instrument: {
    id: 0,
    symbol: 'MAREL',
    name: 'Marel hf',
    category: AssetType.BOND,
    currencyCode: CurrencyEnum.ISK,
    holdings: [],
    showComposition: true,
    categoryCode: 'BOND',
  },
  quantity: 3656.6124,
  marketPrice: 142.432,
  marketYield: 0.0,
  marketCurrencyPrice: 1.0,
  marketValue: 520819.0,
  buyValue: 520000.0,
  valueWeight: 1.0,
  expectedTax: 180.0,
  inflow: 520000.0,
  outflow: 0.0,
  realizedGain: 0.0,
  unrealizedGain: 819.0,
  contribution: 0.0015952325,
  instrumentReturn: 0.0015952325,
};

export const PortfolioCompositionPerformanceMock: PortfolioCompositionPerformanceSchema = {
  ids: [1, 2, 3],
  ownerSSN: '290896-2230',
  currencyCode: CurrencyEnum.ISK,
  startDate: '2021-01-01',
  periodType: Period.THIS_YEAR,
  unrealizedGain: 10,
  realizedGain: 10000,
  marketValueStartOfPeriod: 293,
  marketValue: 1000000,
  inflow: 90,
  outflow: 47,
  tax: 5,
  totalReturn: 8574,
  holdings: [],
  priceSeries: [
    {
      timestamp: '2021-01-01',
      marketValue: 0,
      price: 10,
    },
  ],
};
