import {
  InstrumentHoldingSchema,
  PortfolioCompositionPerformanceSchema,
  PortfolioHoldingSchema,
  PriceSeriesSchema,
} from '@kvika/api-types';
import { AssetScreenText, GeneralText } from '../constants/Text';
import { CategoryComposition, CategorySums, AssetType, AssetPill } from '../types/Types';

export const CATEGORY_FILTERS: AssetPill[] = [
  { type: AssetType.EQUITY, text: AssetScreenText.Equity },
  { type: AssetType.BOND, text: AssetScreenText.Bond },
  { type: AssetType.FUND, text: AssetScreenText.Fund },
  { type: AssetType.DEPOSIT, text: AssetScreenText.Deposit },
];

export const GENERAL_FILTERS: AssetPill[] = [
  { type: AssetType.ALL_ASSETS, text: AssetScreenText.AllAssets },
  { type: AssetType.OTHER, text: AssetScreenText.Other },
];

const getIsOtherCategory = (holding: PortfolioHoldingSchema) => {
  const { categoryCode } = holding.instrument;
  return ![AssetType.FUND, AssetType.BOND, AssetType.DEPOSIT, AssetType.EQUITY].some(
    (assetType) => assetType === categoryCode
  );
};

const filterHoldingByCategory = (holding: PortfolioHoldingSchema, filter: AssetType) => {
  const { categoryCode } = holding.instrument;
  return filter === categoryCode;
};

export const getFilteredHoldings = (
  selectedFilter: AssetType,
  portfoliosPerformance: PortfolioCompositionPerformanceSchema
) => {
  if (selectedFilter === AssetType.ALL_ASSETS) {
    // Spreading so we can sort later because that changes to array in place
    return portfoliosPerformance?.holdings ? [...portfoliosPerformance.holdings] : [];
  }
  if (selectedFilter === AssetType.OTHER) {
    return portfoliosPerformance?.holdings.filter(getIsOtherCategory);
  }
  return portfoliosPerformance?.holdings.filter((holding) => filterHoldingByCategory(holding, selectedFilter));
};

export const orderCategories = (a: AssetPill, b: AssetPill): number => {
  if (a.text === AssetScreenText.AllAssets) return -1;
  if (b.text === AssetScreenText.AllAssets) return 1;

  if (a.text === AssetScreenText.Equity) return -1;
  if (b.text === AssetScreenText.Equity) return 1;

  if (a.text === AssetScreenText.Bond) return -1;
  if (b.text === AssetScreenText.Bond) return 1;

  if (a.text === AssetScreenText.Fund) return -1;
  if (b.text === AssetScreenText.Fund) return 1;

  if (a.text === AssetScreenText.Deposit) return -1;
  if (b.text === AssetScreenText.Deposit) return 1;

  if (a.text === AssetScreenText.Other) return -1;
  if (b.text === AssetScreenText.Other) return 1;

  return a.text < b.text ? -1 : 1;
};

export const getAllCategories = (portfoliosPerformance?: PortfolioCompositionPerformanceSchema): AssetPill[] => {
  const categories = portfoliosPerformance?.holdings.map((holding) => holding.instrument.categoryCode);
  const matchedFilters = CATEGORY_FILTERS.filter((filter) => categories?.some((category) => category === filter.type));
  const hasOtherCategory = portfoliosPerformance?.holdings.some(getIsOtherCategory);
  const otherCategory = GENERAL_FILTERS[1];
  const allAssetsCategory = GENERAL_FILTERS[0];

  return [allAssetsCategory, ...matchedFilters, ...(hasOtherCategory ? [otherCategory] : [])].sort(orderCategories);
};

const getCategorySums = (holdings: PortfolioHoldingSchema[]): CategorySums => {
  return holdings.reduce((acc: CategorySums, holding) => {
    const { categoryCode } = holding.instrument;
    const { marketValue } = holding;
    const categoryName = CATEGORY_FILTERS.find((filter) => filter.type === categoryCode)?.text ?? GeneralText.Other;
    const currentSum = acc[categoryName] ?? 0;
    return { ...acc, [categoryName]: currentSum + marketValue };
  }, {});
};

export const getCompositionByCategory = (
  portfoliosPerformance: PortfolioCompositionPerformanceSchema,
  totalAssets: number
) => {
  const sums = getCategorySums(portfoliosPerformance.holdings);

  const percentages = Object.keys(sums).reduce((acc: CategoryComposition[], category) => {
    const value = sums[category];
    const percentage = (value / totalAssets) * 100;
    const item = { category, percentage, value };
    return [...acc, item];
  }, []);

  return percentages;
};

export const getTotalAssets = (portfoliosPerformance: PortfolioCompositionPerformanceSchema) => {
  return portfoliosPerformance.holdings.reduce((previousSum, currentHolding) => {
    return previousSum + currentHolding.marketValue;
  }, 0);
};

export const getTotalAssetValueText = (text: string) => {
  return `${text} ${AssetScreenText.Total}`;
};

export const getTotalAssetValue = (
  selectedFilter: AssetType,
  portfoliosPerformance?: PortfolioCompositionPerformanceSchema
) => {
  const filteredHoldings = portfoliosPerformance && getFilteredHoldings(selectedFilter, portfoliosPerformance);
  return filteredHoldings?.reduce((acc, curr) => acc + curr.marketValue, 0);
};

export const compareMarketValue = (firstHolding: PortfolioHoldingSchema, secondHolding: PortfolioHoldingSchema) => {
  return secondHolding.marketValue - firstHolding.marketValue;
};

export const compareInstrumentHoldings = (a: InstrumentHoldingSchema, b: InstrumentHoldingSchema) => {
  return b.weight - a.weight;
};

export const getSortedComposition = (composition: InstrumentHoldingSchema[]) => {
  return [...composition].sort(compareInstrumentHoldings);
};

export const aggregateXHoldings = (holdings: InstrumentHoldingSchema[], x = 10) => {
  const sortedHoldings = holdings.slice().sort((a, b) => (a.weight > b.weight ? -1 : 1));
  const topHoldings = sortedHoldings.slice(0, x);
  const index = topHoldings.findIndex((holding) => holding.symbol === 'ISK');

  // If ISK is in the top holdings we need to add it to the second to last position
  const sortedTopHoldingsWithIsk = index !== -1 ? getTopHoldingsWithIsk(topHoldings, index) : topHoldings;

  const otherHoldings = sortedHoldings.slice(x);
  const otherHoldingsWeight = otherHoldings.reduce((totalWeight, currHodling) => {
    return totalWeight + currHodling.weight;
  }, 0);

  if (otherHoldings.length > 0) {
    sortedTopHoldingsWithIsk.push({
      name: 'Annað',
      symbol: '', // We don't show the symbol for the aggregated holdings so this is OK
      weight: otherHoldingsWeight,
      positionDate: '',
    });
  }

  return sortedTopHoldingsWithIsk;
};

// TODO: Write tests for this
const getTopHoldingsWithIsk = (holdings: InstrumentHoldingSchema[], index: number) => {
  const topHoldingsWithoutIsk = [...holdings.slice(0, index), ...holdings.slice(index + 1)];
  return [...topHoldingsWithoutIsk, holdings[index]];
};

export const getSortedPriceSeries = (priceSeries: PriceSeriesSchema[]) => {
  return [...priceSeries].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
};
