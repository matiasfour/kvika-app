import { isEveryPortfolioSelected, selectEveryPortfolio } from '../PortfolioUtils';

const portfolios = [
  {
    investmentUserId: 'c5aa9223a72b4f9a86166b50325133d1',
    investmentUserSSN: '1307802969',
    portfolioId: 166648,
    portfolioName: 'Geymslusafn',
    portfolioOwnerName: 'Björk Hauksdóttir',
    portfolioOwnerSSN: '1307802969',
  },
  {
    investmentUserId: 'c5aa9223a72b4f9a86166b50325133d1',
    investmentUserSSN: '1307802969',
    portfolioId: 33344433,
    portfolioName: 'Geymslusafn',
    portfolioOwnerName: 'Björk Hauksdóttir',
    portfolioOwnerSSN: '1307802969',
  },
];
describe('isEveryPortfolioSelected', () => {
  it('should return true if every portfolio is selected', () => {
    const selectedPortfolioIds = [166648, 33344433];
    const result = isEveryPortfolioSelected(portfolios, selectedPortfolioIds);
    expect(result).toBeTruthy();
  });

  it('should return false if any portfolio is not selected', () => {
    const selectedPortfolioIds = [166648];
    const result = isEveryPortfolioSelected(portfolios, selectedPortfolioIds);
    expect(result).toBeFalsy();
  });

  it('should return false if no portfolio is selected', () => {
    const selectedPortfolioIds: number[] = [];
    const result = isEveryPortfolioSelected(portfolios, selectedPortfolioIds);
    expect(result).toBeFalsy();
  });
});

describe('selectEveryPortfolio', () => {
  const selectedPortfolioIds: number[] = [];
  const setSelectedPortfolioIds = (ids: number[]) => {
    selectedPortfolioIds.push(...ids);
  };

  it('should select every portfolio', () => {
    selectEveryPortfolio(portfolios, selectedPortfolioIds, setSelectedPortfolioIds);
    const ALL_PORTFOLIOS_IDS = [166648, 33344433];
    expect(selectedPortfolioIds).toStrictEqual(ALL_PORTFOLIOS_IDS);
  });
});
