import {
  getFormattedAmountLabel,
  getFormattedPercentageLabel,
  getIndexFromPosition,
  getRoundToNumber,
  getYInterval,
  getYIntervalValues,
} from '../GraphUtils';

describe('GraphUtils', () => {
  describe('getIndexFromPosition', () => {
    it('should return 0 if negative x, width or steps', () => {
      const indexNegX = getIndexFromPosition(-100, 200, 20);
      const indexNegWidth = getIndexFromPosition(100, -200, 20);
      const indexNegSteps = getIndexFromPosition(100, 200, -20);
      expect(indexNegX).toBe(0);
      expect(indexNegWidth).toBe(0);
      expect(indexNegSteps).toBe(0);
    });

    it('should return 0 if combination of negative inputs', () => {
      const indexNegXNegWidth = getIndexFromPosition(-100, -200, 20);
      const indexNegXNegSteps = getIndexFromPosition(-100, 200, -20);
      const indexNegWidthNegSteps = getIndexFromPosition(100, -200, -20);
      const indexNegXNegWidthNegSteps = getIndexFromPosition(-100, -200, -20);
      expect(indexNegXNegWidth).toBe(0);
      expect(indexNegXNegSteps).toBe(0);
      expect(indexNegWidthNegSteps).toBe(0);
      expect(indexNegXNegWidthNegSteps).toBe(0);
    });

    it('should return 0 if x, width or steps is 0', () => {
      const indexZeroX = getIndexFromPosition(0, 200, 20);
      const indexZeroWidth = getIndexFromPosition(100, 0, 20);
      const indexZeroSteps = getIndexFromPosition(100, 200, 0);
      expect(indexZeroX).toBe(0);
      expect(indexZeroWidth).toBe(0);
      expect(indexZeroSteps).toBe(0);
    });

    it('should return 0 if combination of zero inputs', () => {
      const indexZeroXZeroWidth = getIndexFromPosition(0, 0, 20);
      const indexZeroXZeroSteps = getIndexFromPosition(0, 200, 0);
      const indexZeroWidthZeroSteps = getIndexFromPosition(100, 0, 0);
      const indexZeroXZeroWidthZeroSteps = getIndexFromPosition(0, 0, 0);
      expect(indexZeroXZeroWidth).toBe(0);
      expect(indexZeroXZeroSteps).toBe(0);
      expect(indexZeroWidthZeroSteps).toBe(0);
      expect(indexZeroXZeroWidthZeroSteps).toBe(0);
    });

    it('should return correct index if x, width and steps are positive', () => {
      const index = getIndexFromPosition(100, 200, 20);
      expect(index).toBe(10);
    });

    it('should return last index if x and width are the same', () => {
      const index = getIndexFromPosition(100, 100, 20);
      expect(index).toBe(19);
    });
  });

  describe('getRoundToNumber', () => {
    it('should return 10_000_000 if input is 100_000_000 or larger', () => {
      const roundToNumber100m = getRoundToNumber(100_000_000);
      const roundToNumber500m = getRoundToNumber(500_000_000);
      expect(roundToNumber100m).toBe(10_000_000);
      expect(roundToNumber500m).toBe(10_000_000);
    });
    it('should return find the space for the input and divide the space / 2 if input is between 100_000_000 and 0.0001', () => {
      const roundToNumber99m = getRoundToNumber(99_999_999);
      const roundToNumber50m = getRoundToNumber(50_000_000);
      const roundToNumberFraction = getRoundToNumber(0.0001);
      expect(roundToNumber99m).toBe(5_000_000);
      expect(roundToNumber50m).toBe(5_000_000);
      expect(roundToNumberFraction).toBe(0.00005);
    });
    it('should return 000025 if input is smaller then 0.0001', () => {
      const roundToNumberFraction = getRoundToNumber(0.00001);
      const roundToNumberFraction2 = getRoundToNumber(0.0000099);
      expect(roundToNumberFraction).toBe(0.000025);
      expect(roundToNumberFraction2).toBe(0.000025);
    });
  });

  describe('getYInterval for market value graph', () => {
    it('should return input / 4 rounded up to the nearest 10.000.000 when >= 100.000.000', () => {
      const interval100M = getYInterval(0, 100_000_000, 'amount');
      const interval143M = getYInterval(0, 143_000_000, 'amount');
      const interval298M = getYInterval(0, 298_000_000, 'amount');
      const interval1184M = getYInterval(0, 1_184_000_000, 'amount');
      expect(interval100M).toBe(30_000_000);
      expect(interval143M).toBe(40_000_000);
      expect(interval298M).toBe(80_000_000);
      expect(interval1184M).toBe(300_000_000);
    });

    it('should return input / 4 rounded up to the nearest 5.000.000 when >= 10.000.000 & < 100.000.000', () => {
      const interval10M = getYInterval(0, 10_000_000, 'amount');
      const interval14M = getYInterval(0, 14_000_000, 'amount');
      const interval29M = getYInterval(0, 29_000_000, 'amount');
      const interval99M = getYInterval(0, 99_000_000, 'amount');
      expect(interval10M).toBe(5_000_000);
      expect(interval14M).toBe(5_000_000);
      expect(interval29M).toBe(10_000_000);
      expect(interval99M).toBe(25_000_000);
    });

    it('should return input / 4 rounded up to the nearest 2.500.000 when >= 5.000.000 & < 10.000.000', () => {
      const interval5M = getYInterval(0, 5_000_000, 'amount');
      const interval6M = getYInterval(0, 6_000_000, 'amount');
      const interval9M = getYInterval(0, 9_000_000, 'amount');
      expect(interval5M).toBe(2_500_000);
      expect(interval6M).toBe(2_500_000);
      expect(interval9M).toBe(2_500_000);
    });

    it('should return input / 4 rounded up to the nearest 500.000 when >= 1.000.000 & < 5.000.000', () => {
      const interval1M = getYInterval(0, 1_000_000, 'amount');
      const interval2M = getYInterval(0, 2_000_000, 'amount');
      const interval4M = getYInterval(0, 4_000_000, 'amount');
      expect(interval1M).toBe(500_000);
      expect(interval2M).toBe(500_000);
      expect(interval4M).toBe(1_000_000);
    });
  });

  describe('getYInterval for historical return graph', () => {
    it('should return input / 2 rounded to the nearest 2.5 when higher than 5', () => {
      const interval5 = getYInterval(0, 5, 'percentage');
      const interval6 = getYInterval(0, 6, 'percentage');
      const interval7 = getYInterval(0, 7, 'percentage');
      const interval8 = getYInterval(0, 8, 'percentage');
      const interval9 = getYInterval(0, 9, 'percentage');
      expect(interval5).toBe(2.5);
      expect(interval6).toBe(5);
      expect(interval7).toBe(5);
      expect(interval8).toBe(5);
      expect(interval9).toBe(5);
    });

    it('should return input / 2 rounded to the nearest 0.5 when higher than 1 and lower than 5', () => {
      const interval1 = getYInterval(0, 1, 'percentage');
      const interval2 = getYInterval(0, 2, 'percentage');
      const interval3 = getYInterval(0, 3, 'percentage');
      const interval4 = getYInterval(0, 4, 'percentage');
      expect(interval1).toBe(0.5);
      expect(interval2).toBe(1);
      expect(interval3).toBe(1.5);
      expect(interval4).toBe(2);
    });
  });

  describe('getFormattedAmountLabel', () => {
    it('should have suffix m.kr. if >= 1.000.000 kr.', () => {
      const formattedMarketValue1M = getFormattedAmountLabel(1_000_000);
      const formattedMarketValue8999M = getFormattedAmountLabel(8_999_000_000);
      expect(formattedMarketValue1M).toBe('1 m.kr.');
      expect(formattedMarketValue8999M).toBe('8.999 m.kr.');
    });
    it('should have suffix þ.kr. if >= 1.000 kr. & < 1.000.000 kr.', () => {
      const formattedMarketValue1T = getFormattedAmountLabel(1_000);
      const formattedMarketValue999T = getFormattedAmountLabel(999_000);
      expect(formattedMarketValue1T).toBe('1 þ.kr.');
      expect(formattedMarketValue999T).toBe('999 þ.kr.');
    });
    it('should have suffix kr. if < 1.000 kr.', () => {
      const formattedMarketValue1 = getFormattedAmountLabel(1);
      const formattedMarketValue999 = getFormattedAmountLabel(999);
      expect(formattedMarketValue1).toBe('1 kr.');
      expect(formattedMarketValue999).toBe('999 kr.');
    });
  });

  describe('getFormattedPercentageLabel', () => {
    it('should return the input * 100 and formatted as percentage with 2 decimal places', () => {
      const formattedReturn1 = getFormattedPercentageLabel(0.01);
      const formattedReturn2 = getFormattedPercentageLabel(0.001);
      const formattedReturn3 = getFormattedPercentageLabel(0.0001);
      expect(formattedReturn1).toBe('1%');
      expect(formattedReturn2).toBe('0,1%');
      expect(formattedReturn3).toBe('0,01%');
    });
  });

  describe('getYIntervalValues', () => {
    it('should return amount labels for market value graph', () => {
      const values = getYIntervalValues(0, 1_300_000, 'amount');
      expect(values).toStrictEqual(['2 m.kr.', '1,5 m.kr.', '1 m.kr.', '500 þ.kr.', '0 kr.']);
    });
  });
});
