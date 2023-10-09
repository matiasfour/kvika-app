import { MonthsText } from '../constants/Text';
import { Period } from '../types/Types';

export const getYearFromTimestamp = (timestamp: string): string => {
  return timestamp.substring(0, 4);
};

export const getMonthFromTimestamp = (timestamp: string): string => {
  return timestamp.substring(5, 7);
};

export const getDayFromTimestamp = (timestamp: string): string => {
  return timestamp.substring(8, 10);
};

export const getMonth = (timestamp: string): string => {
  const month = getMonthFromTimestamp(timestamp);
  switch (month) {
    case '01':
      return MonthsText.January;
    case '02':
      return MonthsText.February;
    case '03':
      return MonthsText.March;
    case '04':
      return MonthsText.April;
    case '05':
      return MonthsText.May;
    case '06':
      return MonthsText.June;
    case '07':
      return MonthsText.July;
    case '08':
      return MonthsText.August;
    case '09':
      return MonthsText.September;
    case '10':
      return MonthsText.October;
    case '11':
      return MonthsText.November;
    case '12':
      return MonthsText.December;
    default:
      return '';
  }
};

export const getFormattedDate = (timestamp: string, monthAsNumber = false) => {
  const day = getDayFromTimestamp(timestamp);
  const month = getMonthFromTimestamp(timestamp);
  const year = getYearFromTimestamp(timestamp);
  return monthAsNumber ? `${day}.${month}.${year}` : `${Number(day)}. ${getMonth(timestamp)} ${year}`;
};

export const getFromDateForPeriod = (period: Period, today: Date) => {
  switch (period) {
    case Period.ONE_WEEK:
      return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    case Period.ONE_MONTH:
      return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    case Period.SIX_MONTHS:
      return new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
    case Period.ONE_YEAR:
      return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    case Period.FIVE_YEARS:
      return new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    case Period.MAX:
      return new Date(2000, 1, 1);
    case Period.THIS_YEAR:
    default:
      return new Date(today.getFullYear(), 0, 1);
  }
};

type StartAndEndDate = {
  startDate: Date;
  endDate: Date;
};

export const getElapsedMS = (period: StartAndEndDate) => {
  const msDiff = period.endDate.getTime() - period.startDate.getTime();
  return msDiff;
};

export const getFormattedDateWithoutTime = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getFormattedDayOfWeek = (date: Date) => {
  const day = date.getDay();

  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mán';
    case 2:
      return 'Þri';
    case 3:
      return 'Mið';
    case 4:
      return 'Fim';
    case 5:
      return 'Fös';
    case 6:
      return 'Lau';
    default:
      return '';
  }
};

export const getShortDayAndMonth = (timestamp: string) => {
  const day = new Date(timestamp).getDate();
  return `${day}. ${getShortMonthName(timestamp).toLowerCase()}.`;
};

/**
 * Returns Jan, Feb, etc.
 * @param timestamp
 */
export const getShortMonthName = (timestamp: string) => {
  const shortName = getMonth(timestamp).substring(0, 3);
  return shortName.charAt(0).toUpperCase() + shortName.slice(1);
};
