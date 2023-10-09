import { PortfolioAccessSchema } from '@kvika/api-types';

export const isEveryPortfolioSelected = (portfolios: PortfolioAccessSchema[], selectedPortfolioIds: number[]) => {
  return portfolios.every((portfolio) => selectedPortfolioIds.includes(portfolio.portfolioId));
};

export const selectEveryPortfolio = (
  portfolioAccess: PortfolioAccessSchema[],
  selectedPortfolioIds: number[],
  setSelectedPortfolioIds: (holdings: number[]) => void
) => {
  // If all holdings are selected, deselect them all
  if (isEveryPortfolioSelected(portfolioAccess, selectedPortfolioIds)) {
    setSelectedPortfolioIds([]);
  } else {
    // Otherwise, select all holdings
    const portfolioIds = portfolioAccess.map((p) => p.portfolioId);
    setSelectedPortfolioIds(portfolioIds);
  }
};

export const onChangePortfolio = (
  portfolioId: number,
  selectedPortfolioIds: number[],
  setSelectedPortfolioIds: (holdings: number[]) => void
) => {
  const existingPortfolio = selectedPortfolioIds.find((pId) => portfolioId === pId);
  if (!existingPortfolio) {
    // Portfolio doesn't exist, add it to the list
    const newPortfolios = [...selectedPortfolioIds, portfolioId];
    setSelectedPortfolioIds(newPortfolios);
  } else {
    // Portfolio exists, remove it from the list
    setSelectedPortfolioIds(selectedPortfolioIds.filter((pId) => portfolioId !== pId));
  }
};
