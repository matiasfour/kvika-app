import { Period } from '../../types/Types';
import { getElapsedMS, getFormattedDate, getFromDateForPeriod } from '../TimeUtils';

describe('getFormattedDate', () => {
  it('should return the date in the correct format with month as string', () => {
    const formattedDate = getFormattedDate('2022-12-01');
    expect(formattedDate).toBe('1. desember 2022');
    const secondFormattedDate = getFormattedDate('2021-01-30');
    expect(secondFormattedDate).toBe('30. janúar 2021');
  });
  it('should return the date in the correct format with month as number', () => {
    const formattedDate = getFormattedDate('2022-12-01', true);
    expect(formattedDate).toBe('01.12.2022');
    const secondFormattedDate = getFormattedDate('2021-01-30', true);
    expect(secondFormattedDate).toBe('30.01.2021');
  });
});

describe('getElapsedMS', () => {
  it('should return 300000', () => {
    const startDate = new Date(2022, 10, 13, 15, 38, 0, 0); // Thu Oct 13 2022 15:38:00 GMT+0000
    const endDate = new Date(2022, 10, 13, 15, 43, 0, 0); // Thu Oct 13 2022 15:43:00 GMT+0000
    const elapsedTime = getElapsedMS({ startDate, endDate });
    expect(elapsedTime).toBe(300000);
  });
  it('should return 30000', () => {
    const startDate = new Date(2022, 10, 13, 15, 43, 0, 0); // Thu Oct 13 2022 15:43:00 GMT+0000
    const endDate = new Date(2022, 10, 13, 15, 43, 30, 0); // Thu Oct 13 2022 15:43:30 GMT+0000
    const elapsedTime = getElapsedMS({ startDate, endDate });
    expect(elapsedTime).toBe(30000);
  });
  it('should return 1000', () => {
    const startDate = new Date(2022, 10, 13, 15, 43, 0, 0); // Thu Oct 13 2022 15:43:00 GMT+0000
    const endDate = new Date(2022, 10, 13, 15, 43, 1, 0); // Thu Oct 13 2022 15:43:01 GMT+0000
    const elapsedTime = getElapsedMS({ startDate, endDate });
    expect(elapsedTime).toBe(1000);
  });
});

describe('getFromDateForPeriod', () => {
  it('should return a start of year date with THIS_YEAR', () => {
    const date = getFromDateForPeriod(Period.THIS_YEAR, new Date(2022, 5, 7));
    expect(date.toISOString()).toStrictEqual(new Date(2022, 0, 1).toISOString());
  });
  it('should return a date from last week until input date with ONE_WEEK', () => {
    const date = getFromDateForPeriod(Period.ONE_WEEK, new Date(2022, 0, 8));
    expect(date.toISOString()).toStrictEqual(new Date(2022, 0, 1).toISOString());
  });
  it('should return a date from last month until input date with ONE_MONTH', () => {
    const date = getFromDateForPeriod(Period.ONE_MONTH, new Date(2022, 0, 8));
    expect(date.toISOString()).toStrictEqual(new Date(2021, 11, 8).toISOString());
  });
  it('should return a date from last year until input date with ONE_YEAR', () => {
    const date = getFromDateForPeriod(Period.ONE_YEAR, new Date(2022, 0, 8));
    expect(date.toISOString()).toStrictEqual(new Date(2021, 0, 8).toISOString());
  });
  it('should return a date from last 5 years until input date with FIVE_YEARS', () => {
    const date = getFromDateForPeriod(Period.FIVE_YEARS, new Date(2022, 0, 8));
    expect(date.toISOString()).toStrictEqual(new Date(2017, 0, 8).toISOString());
  });
  it('should return the first possible date (01.01.2000) until input date with MAX', () => {
    const date = getFromDateForPeriod(Period.MAX, new Date(2022, 0, 8));
    expect(date.toISOString()).toStrictEqual(new Date(2000, 1, 1).toISOString());
  });
});
