import { InstrumentHoldingSchema } from '@kvika/api-types';
import { AssetScreenText } from '../../constants/Text';
import { generateMockPortfolioCompositionPerformance } from '../../mocks';
import { AssetPill, AssetType } from '../../types/Types';
import {
  aggregateXHoldings,
  CATEGORY_FILTERS,
  GENERAL_FILTERS,
  getAllCategories,
  getCompositionByCategory,
  getFilteredHoldings,
  getTotalAssets,
  orderCategories,
} from '../AssetUtils';

describe('getAllCategories', () => {
  it('should return categories for ALL_ASSETS, FUND, BOND, EQUITY & DEPOSIT', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.EQUITY,
      AssetType.BOND,
      AssetType.FUND,
      AssetType.DEPOSIT,
    ]);
    const categories = getAllCategories(mockPortfolioCompositionPerformance);
    const expectedCategories = [GENERAL_FILTERS[0], ...CATEGORY_FILTERS];
    expect(categories).toStrictEqual(expectedCategories);
  });

  it('should return categories for ALL_ASSETS, FUNDS, BONDS, STOCKS & OTHER', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.EQUITY,
      AssetType.BOND,
      AssetType.FUND,
      AssetType.DEPOSIT,
      'Unkown category',
    ]);
    const categories = getAllCategories(mockPortfolioCompositionPerformance);
    const expectedCategories = [GENERAL_FILTERS[0], ...CATEGORY_FILTERS, GENERAL_FILTERS[1]];
    expect(categories).toStrictEqual(expectedCategories);
  });

  it('should return categories for ALL_ASSETS & OTHER', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance(['Unkown category']);
    const categories = getAllCategories(mockPortfolioCompositionPerformance);
    const expectedCategories = [GENERAL_FILTERS[0], GENERAL_FILTERS[1]];
    expect(categories).toStrictEqual(expectedCategories);
  });
});

describe('getFilteredHoldings', () => {
  it('should return all holdings', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.FUND,
      AssetType.BOND,
      AssetType.EQUITY,
    ]);
    const holdings = getFilteredHoldings(AssetType.ALL_ASSETS, mockPortfolioCompositionPerformance);
    const expectedHoldings = mockPortfolioCompositionPerformance.holdings;
    expect(holdings).toStrictEqual(expectedHoldings);
  });
  it('should only return FUNDS', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.FUND,
      AssetType.BOND,
      AssetType.EQUITY,
    ]);
    const holdings = getFilteredHoldings(AssetType.FUND, mockPortfolioCompositionPerformance);
    const expectedHoldings = mockPortfolioCompositionPerformance.holdings.filter(
      (holding) => holding.instrument.categoryCode === AssetType.FUND
    );
    expect(holdings).toStrictEqual(expectedHoldings);
  });
  it('should only return BONDS', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.FUND,
      AssetType.BOND,
      AssetType.EQUITY,
    ]);
    const holdings = getFilteredHoldings(AssetType.BOND, mockPortfolioCompositionPerformance);
    const expectedHoldings = mockPortfolioCompositionPerformance.holdings.filter(
      (holding) => holding.instrument.categoryCode === AssetType.BOND
    );
    expect(holdings).toStrictEqual(expectedHoldings);
  });
  it('should only return OTHER', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.FUND,
      AssetType.BOND,
      AssetType.EQUITY,
    ]);
    const holdings = getFilteredHoldings(AssetType.OTHER, mockPortfolioCompositionPerformance);
    const expectedHoldings = mockPortfolioCompositionPerformance.holdings.filter(
      (holding) => holding.instrument.category === AssetType.OTHER
    );
    expect(holdings).toStrictEqual(expectedHoldings);
  });
});

describe('getCompositionByCategory', () => {
  it('should return a composition of 100% funds', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([AssetType.FUND]);
    const portfolios = mockPortfolioCompositionPerformance;
    const totalAssets = getTotalAssets(portfolios);
    const composition = getCompositionByCategory(portfolios, totalAssets);
    const expectedCompositions = [{ category: AssetScreenText.Fund, percentage: 100, value: 520819 }];
    expect(composition).toStrictEqual(expectedCompositions);
  });
  it('should return a composition of 50% bonds and 50% stocks', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.BOND,
      AssetType.EQUITY,
    ]);
    const portfolios = mockPortfolioCompositionPerformance;
    const totalAssets = getTotalAssets(portfolios);
    const composition = getCompositionByCategory(portfolios, totalAssets);
    const expectedCompositions = [
      { category: AssetScreenText.Bond, percentage: 50, value: 520819 },
      { category: AssetScreenText.Equity, percentage: 50, value: 520819 },
    ];
    expect(composition).toStrictEqual(expectedCompositions);
  });
});

describe('getTotalAssets', () => {
  it('should return the total assets', () => {
    const mockPortfolioCompositionPerformance = generateMockPortfolioCompositionPerformance([
      AssetType.FUND,
      AssetType.EQUITY,
    ]);
    const portfolios = mockPortfolioCompositionPerformance;
    const totalAssets = getTotalAssets(portfolios);
    const expectedTotalAssets = 1041638;
    expect(totalAssets).toStrictEqual(expectedTotalAssets);
  });
});

describe('orderCategories', () => {
  it('should return ordered array with expeceted elements', () => {
    const mockFilters: AssetPill[] = [
      {
        text: AssetScreenText.Equity,
        type: AssetType.EQUITY,
      },
      {
        text: AssetScreenText.Other,
        type: AssetType.OTHER,
      },
      {
        text: AssetScreenText.Fund,
        type: AssetType.FUND,
      },
      {
        text: AssetScreenText.AllAssets,
        type: AssetType.ALL_ASSETS,
      },
      {
        text: AssetScreenText.Bond,
        type: AssetType.BOND,
      },
    ];
    const expectedResult: AssetPill[] = [
      {
        text: AssetScreenText.AllAssets,
        type: AssetType.ALL_ASSETS,
      },
      {
        text: AssetScreenText.Equity,
        type: AssetType.EQUITY,
      },
      {
        text: AssetScreenText.Bond,
        type: AssetType.BOND,
      },
      {
        text: AssetScreenText.Fund,
        type: AssetType.FUND,
      },
      {
        text: AssetScreenText.Other,
        type: AssetType.OTHER,
      },
    ];

    expect(mockFilters).not.toStrictEqual(expectedResult);

    const mockSortedFilters: AssetPill[] = mockFilters.sort(orderCategories);

    expect(mockSortedFilters).toStrictEqual(expectedResult);
  });
  it('should return ordered array with unexpected elements', () => {
    const mockFilters: AssetPill[] = [
      {
        text: AssetScreenText.Equity,
        type: AssetType.EQUITY,
      },
      {
        text: AssetScreenText.Other,
        type: AssetType.OTHER,
      },
      {
        text: AssetScreenText.Total,
        type: AssetType.ALL_ASSETS,
      },
      {
        text: AssetScreenText.Fund,
        type: AssetType.FUND,
      },
      {
        text: AssetScreenText.NoAssetsFound,
        type: AssetType.ALL_ASSETS,
      },
      {
        text: AssetScreenText.AllAssets,
        type: AssetType.ALL_ASSETS,
      },
      {
        text: AssetScreenText.Bond,
        type: AssetType.BOND,
      },
    ];
    const expectedResult: AssetPill[] = [
      {
        text: AssetScreenText.AllAssets,
        type: AssetType.ALL_ASSETS,
      },
      {
        text: AssetScreenText.Equity,
        type: AssetType.EQUITY,
      },
      {
        text: AssetScreenText.Bond,
        type: AssetType.BOND,
      },
      {
        text: AssetScreenText.Fund,
        type: AssetType.FUND,
      },
      {
        text: AssetScreenText.Other,
        type: AssetType.OTHER,
      },
      {
        text: AssetScreenText.NoAssetsFound,
        type: AssetType.ALL_ASSETS,
      },
      {
        text: AssetScreenText.Total,
        type: AssetType.ALL_ASSETS,
      },
    ];

    expect(mockFilters).not.toStrictEqual(expectedResult);

    const mockSortedFilters: AssetPill[] = mockFilters.sort(orderCategories);

    expect(mockSortedFilters).toStrictEqual(expectedResult);
  });
});

describe('aggregateXHoldings', () => {
  it('should return the top 10 holdings, and aggregate the rest', () => {
    const holdings: InstrumentHoldingSchema[] = [
      {
        name: 'Test 1',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 10,
        positionDate: '',
      },
      {
        name: 'Test 2',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 9,
        positionDate: '',
      },
      {
        name: 'Test 3',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 8,
        positionDate: '',
      },
      {
        name: 'Test 4',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 7,
        positionDate: '',
      },
      {
        name: 'Test 5',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 6,
        positionDate: '',
      },
      {
        name: 'Test 6',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 5,
        positionDate: '',
      },
      {
        name: 'Test 7',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 4,
        positionDate: '',
      },
      {
        name: 'Test 8',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 9',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 2,
        positionDate: '',
      },
      {
        name: 'Test 10',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 1,
        positionDate: '',
      },
      {
        name: 'Test 11',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 12',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 13',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 14',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 15',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 16',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 17',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 18',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 19',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 20',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 21',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 22',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 23',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 24',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 25',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
    ];

    const aggregatedHoldings = aggregateXHoldings(holdings, 10);

    expect(aggregatedHoldings).toStrictEqual([
      {
        name: 'Test 1',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 10,
        positionDate: '',
      },
      {
        name: 'Test 2',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 9,
        positionDate: '',
      },
      {
        name: 'Test 3',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 8,
        positionDate: '',
      },
      {
        name: 'Test 4',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 7,
        positionDate: '',
      },
      {
        name: 'Test 5',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 6,
        positionDate: '',
      },
      {
        name: 'Test 6',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 5,
        positionDate: '',
      },
      {
        name: 'Test 7',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 4,
        positionDate: '',
      },
      {
        name: 'Test 8',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 11',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 12',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Annað',
        symbol: '',
        weight: 42,
        positionDate: '',
      },
    ]);
  });

  it('should return the top 10 holdings with ISK at the 9th place, and aggregate the rest', () => {
    const holdings: InstrumentHoldingSchema[] = [
      {
        name: 'Test 1',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 10,
        positionDate: '',
      },
      {
        name: 'Test 2',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 9,
        positionDate: '',
      },
      {
        name: 'Test 3',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 8,
        positionDate: '',
      },
      {
        name: 'Test 4',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 7,
        positionDate: '',
      },
      {
        name: 'Test 24',
        symbol: 'ISK',
        weight: 300,
        positionDate: '',
      },
      {
        name: 'Test 5',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 6,
        positionDate: '',
      },
      {
        name: 'Test 6',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 5,
        positionDate: '',
      },
      {
        name: 'Test 7',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 4,
        positionDate: '',
      },
      {
        name: 'Test 8',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 9',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 2,
        positionDate: '',
      },
      {
        name: 'Test 10',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 1,
        positionDate: '',
      },
      {
        name: 'Test 11',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 12',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 13',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 14',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 15',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 16',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 17',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 18',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 19',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 20',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 21',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 22',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 23',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 25',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
    ];

    const aggregatedHoldings = aggregateXHoldings(holdings, 10);

    expect(aggregatedHoldings).toStrictEqual([
      {
        name: 'Test 1',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 10,
        positionDate: '',
      },
      {
        name: 'Test 2',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 9,
        positionDate: '',
      },
      {
        name: 'Test 3',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 8,
        positionDate: '',
      },
      {
        name: 'Test 4',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 7,
        positionDate: '',
      },
      {
        name: 'Test 5',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 6,
        positionDate: '',
      },
      {
        name: 'Test 6',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 5,
        positionDate: '',
      },
      {
        name: 'Test 7',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 4,
        positionDate: '',
      },
      {
        name: 'Test 8',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 11',
        symbol: 'SOME_INSTRUMENT_SYMBOL',
        weight: 3,
        positionDate: '',
      },
      {
        name: 'Test 24',
        symbol: 'ISK',
        weight: 300,
        positionDate: '',
      },
      {
        name: 'Annað',
        symbol: '',
        weight: 42,
        positionDate: '',
      },
    ]);
  });
});
