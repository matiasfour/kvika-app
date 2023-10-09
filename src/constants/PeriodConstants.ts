import { InstrumentPeriodPill, Period } from '../types/Types';
import { getCurrentYear } from '../utils/Utils';
import { PeriodText } from './Text';

export const PERIODS: InstrumentPeriodPill[] = [
  {
    type: Period.THIS_YEAR,
    text: getCurrentYear(),
  },
  {
    type: Period.ONE_WEEK,
    text: PeriodText.OneWeek,
  },
  {
    type: Period.ONE_MONTH,
    text: PeriodText.OneMonth,
  },
  {
    type: Period.SIX_MONTHS,
    text: PeriodText.SixMonths,
  },
  {
    type: Period.ONE_YEAR,
    text: PeriodText.OneYear,
  },
  {
    type: Period.FIVE_YEARS,
    text: PeriodText.FiveYears,
  },
];
