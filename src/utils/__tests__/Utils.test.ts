import { Colors } from '@kvika/theme';
import { Period } from '../../types/Types';
import {
  getColorWithOpacity,
  getInitials,
  getOpacityAsHex,
  getNumberPrefix,
  getGroupedPortfolioAccess,
  getSortedPortfolioAccessGroupHeaders,
  getPortfoliosPerformanceId,
} from '../Utils';

describe('getOpacityAsHex', () => {
  it('Should return correct hex for opacity 40%', () => {
    const opacity = 40;
    const hexValue = getOpacityAsHex(opacity);
    expect(hexValue).toBe('66');
  });

  it('Should return correct hex for opacity 100%', () => {
    const opacity = 100;
    const hexValue = getOpacityAsHex(opacity);
    expect(hexValue).toBe('FF');
  });

  it('Should return correct hex for opacity 0%', () => {
    const opacity = 0;
    const hexValue = getOpacityAsHex(opacity);
    expect(hexValue).toBe('00');
  });
});

describe('getColorWithOpacity', () => {
  it('Should return color with opacity applied', () => {
    const opacity = 30;
    const color = Colors.black;
    const colorWithOpacity = getColorWithOpacity(color, opacity);
    expect(colorWithOpacity).toBe('#0000004D');
  });
});

describe('getInitials', () => {
  it('should return the correct initials for a person with one name', () => {
    const name = 'Jón';
    const initials = getInitials(name);
    expect(initials).toBe('J');
  });
  it('should return the correct initials for a person with two names', () => {
    const name = 'Jón Jónsson';
    const initials = getInitials(name);
    expect(initials).toBe('JJ');
  });
  it('should return the correct initials for a person with three names', () => {
    const name = 'Jón Páll Jónsson';
    const initials = getInitials(name);
    expect(initials).toBe('JPJ');
  });

  it('should return the first three initials for a person with four names', () => {
    const name = 'Jón Páll Helmund Jónsson';
    const initials = getInitials(name);
    expect(initials).toBe('JPJ');
  });
});

describe('getNumberForPrefix', () => {
  it('should return a positive prefix for a positive number', () => {
    const number = 1;
    const prefix = getNumberPrefix(number);
    expect(prefix).toBe('+');
  });
  it('should return a negative prefix for a negative number', () => {
    const number = -1;
    const prefix = getNumberPrefix(number);
    expect(prefix).toBe('');
  });
  it('should return no prefix for zero', () => {
    const number = 0;
    const prefix = getNumberPrefix(number);
    expect(prefix).toBe('');
  });
});

describe('getGroupedPortfolioAccess', () => {
  it('should return only one group for each portfolio owner name', () => {
    const portfoliosAccess = [
      {
        investmentUserId: '1',
        investmentUserSSN: '1122334455',
        portfolioOwnerSSN: '2908962239',
        portfolioOwnerName: 'Fyrirtæki 1',
        portfolioName: 'Eignasafn 1',
        portfolioId: 1,
      },
      {
        investmentUserId: '1',
        investmentUserSSN: '2908962239',
        portfolioOwnerSSN: '1122334455',
        portfolioOwnerName: 'Fyrirtæki 2',
        portfolioName: 'Eignasafn 2',
        portfolioId: 2,
      },
    ];
    const groupedPortfolios = getGroupedPortfolioAccess(portfoliosAccess);
    expect(groupedPortfolios).toStrictEqual({
      'Fyrirtæki 1': [
        {
          investmentUserId: '1',
          investmentUserSSN: '1122334455',
          portfolioOwnerSSN: '2908962239',
          portfolioOwnerName: 'Fyrirtæki 1',
          portfolioName: 'Eignasafn 1',
          portfolioId: 1,
        },
      ],
      'Fyrirtæki 2': [
        {
          investmentUserId: '1',
          investmentUserSSN: '2908962239',
          portfolioOwnerSSN: '1122334455',
          portfolioOwnerName: 'Fyrirtæki 2',
          portfolioName: 'Eignasafn 2',
          portfolioId: 2,
        },
      ],
    });
  });

  it('should portfolios under the group Eignasöfnin mín if they have they have the same investment user and porfolio owner', () => {
    const portfoliosAccess = [
      {
        investmentUserId: '1',
        investmentUserSSN: '2908962239',
        portfolioOwnerSSN: '2908962239',
        portfolioOwnerName: 'Fyrirtæki 1',
        portfolioName: 'Eignasafn 1',
        portfolioId: 1,
      },
      {
        investmentUserId: '1',
        investmentUserSSN: '2908962239',
        portfolioOwnerSSN: '2908962239',
        portfolioOwnerName: 'Fyrirtæki 1',
        portfolioName: 'Eignasafn 2',
        portfolioId: 2,
      },
    ];
    const groupedPortfolios = getGroupedPortfolioAccess(portfoliosAccess);
    expect(groupedPortfolios).toStrictEqual({
      'Eignasöfnin mín': [
        {
          investmentUserId: '1',
          investmentUserSSN: '2908962239',
          portfolioOwnerSSN: '2908962239',
          portfolioOwnerName: 'Fyrirtæki 1',
          portfolioName: 'Eignasafn 1',
          portfolioId: 1,
        },
        {
          investmentUserId: '1',
          investmentUserSSN: '2908962239',
          portfolioOwnerSSN: '2908962239',
          portfolioOwnerName: 'Fyrirtæki 1',
          portfolioName: 'Eignasafn 2',
          portfolioId: 2,
        },
      ],
    });
  });

  describe('getSortedPortfolioAccessGroupHeaders', () => {
    it('should return list of unique portfolio access group headers', () => {
      const groupedPortfolioAccess = {
        'Fyrirtæki 2': [
          {
            investmentUserId: '1',
            investmentUserSSN: '2908962239',
            portfolioOwnerSSN: '2908962239',
            portfolioOwnerName: 'Fyrirtæki 1',
            portfolioName: 'Eignasafn 1',
            portfolioId: 1,
          },
          {
            investmentUserId: '1',
            investmentUserSSN: '2908962239',
            portfolioOwnerSSN: '2908962239',
            portfolioOwnerName: 'Fyrirtæki 1',
            portfolioName: 'Eignasafn 2',
            portfolioId: 2,
          },
        ],
        'Fyrirtæki 1': [
          {
            investmentUserId: '1',
            investmentUserSSN: '2908962239',
            portfolioOwnerSSN: '2908962239',
            portfolioOwnerName: 'Fyrirtæki 1',
            portfolioName: 'Eignasafn 1',
            portfolioId: 1,
          },
          {
            investmentUserId: '1',
            investmentUserSSN: '2908962239',
            portfolioOwnerSSN: '2908962239',
            portfolioOwnerName: 'Fyrirtæki 1',
            portfolioName: 'Eignasafn 2',
            portfolioId: 2,
          },
        ],
      };
      const headers = getSortedPortfolioAccessGroupHeaders(groupedPortfolioAccess);
      expect(headers).toStrictEqual(['Fyrirtæki 1', 'Fyrirtæki 2']);
    });

    it('should return Eignasöfnin mín first in the list', () => {
      const groupedPortfolioAccess = {
        'Eignasöfnin mín': [
          {
            investmentUserId: '1',
            investmentUserSSN: '2908962239',
            portfolioOwnerSSN: '2908962239',
            portfolioOwnerName: 'Fyrirtæki 1',
            portfolioName: 'Eignasafn 1',
            portfolioId: 1,
          },
        ],
        'Fyrirtæki 1': [
          {
            investmentUserId: '1',
            investmentUserSSN: '2908962239',
            portfolioOwnerSSN: '2908962239',
            portfolioOwnerName: 'Fyrirtæki 1',
            portfolioName: 'Eignasafn 1',
            portfolioId: 1,
          },
        ],
        'A Fyrirtæki': [
          {
            investmentUserId: '1',
            investmentUserSSN: '2908962239',
            portfolioOwnerSSN: '2908962239',
            portfolioOwnerName: 'Fyrirtæki 1',
            portfolioName: 'Eignasafn 1',
            portfolioId: 1,
          },
        ],
      };
      const headers = getSortedPortfolioAccessGroupHeaders(groupedPortfolioAccess);
      expect(headers).toStrictEqual(['Eignasöfnin mín', 'A Fyrirtæki', 'Fyrirtæki 1']);
    });
  });

  describe('getPortfoliosPerformanceId', () => {
    it('should return a string with three portfolios ids and correct start and end date with _ between', () => {
      const period = Period.ONE_WEEK;
      const date = new Date(2022, 0, 8);
      const ppid = getPortfoliosPerformanceId([1, 2, 3], period, date);
      expect(ppid).toBe('1,2,3_2022-01-01_2022-01-08');
    });
    it('should return a string with one id and correct start and end date with _ between', () => {
      const period = Period.ONE_WEEK;
      const date = new Date(2022, 0, 8);
      const ppid = getPortfoliosPerformanceId([1], period, date);
      expect(ppid).toBe('1_2022-01-01_2022-01-08');
    });
  });
});
