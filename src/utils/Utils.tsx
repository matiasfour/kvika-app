import { PlatformEnum } from '@kvika/api-client';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { Colors } from '@kvika/theme';
import { getFormattedNumber } from '@kvika/string-utils';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { PortfolioAccessSchema } from '@kvika/api-types';
import { SelectPortfoliosScreenText, PeriodText } from '../constants/Text';
import { GroupedPortfolioAccess, InstrumentPeriodPill, Period, Pill } from '../types/Types';
import { getFormattedDateWithoutTime, getFromDateForPeriod } from './TimeUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('../../app.json');

export const getInitials = (fullName: string) => {
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  if (initials.length > 3) {
    return `${initials.slice(0, 2)}${initials[initials.length - 1]}`;
  }
  return initials;
};

export const getPlatform = () => {
  return Platform.OS === 'ios' ? PlatformEnum.IOS : PlatformEnum.ANDROID;
};

export const getOpacityAsHex = (alphaPercentage: number) => {
  // Borrowed from https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
  const intValue = Math.round((alphaPercentage / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
};

/**
 * @param alphaPercentage A percentage value of the alpha/opacity (f.ex. 40 or 60)
 * @param color The color that the alpha should be applied to
 *
 * @returns The color with the alpha/opacity applied
 */
export const getColorWithOpacity = (color: Colors, alphaPercentage: number) => {
  const alphaHex = getOpacityAsHex(alphaPercentage);
  return `${color}${alphaHex}`;
};

/**
 * Gets prefix for a number.
 * No need to handle negative numbers as they're already be prefixed with a minus sign.
 * @param value The value to be prefixed
 * @returns number with a prefix added
 */
export const getNumberPrefix = (value: number) => {
  if (value > 0) {
    return '+';
  }
  return '';
};

export const getAmountWithPrefix = (amount: number) => {
  const prefix = getNumberPrefix(amount);
  return `${prefix}${getFormattedNumber({ value: amount })}`;
};

/**
 * Takes a fraction like 0.12 and returns a percentage string like 12%
 * @param fraction
 */
export const getPercentageWithPrefixFromFraction = (fraction: number, maximumSignificantDigits = 2) => {
  const percentage = getFormattedNumber({
    value: fraction * 100,
    // Show more significant digits on historical return (percentage) graph when range is very low (<1%)
    // This change has esentially but been reverted but we've added a optional param to override
    // Significant digits
    // TODO: Remove this if Kvika turn out to be happy with 2 as the number of significant digits
    significantDigits: Math.abs(fraction) < 0.01 ? maximumSignificantDigits : 2,
    showTrailingZeros: true,
    symbol: '%',
    showSymbolSpace: false,
  });

  return `${getNumberPrefix(fraction)}${percentage}`;
};

const addNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

export async function registerForPushNotificationsAsync() {
  let token;

  // Workaround to fix issue on login on Samsung phones: https://github.com/expo/expo/issues/18570#issuecomment-1235788144
  const projectId = appConfig?.expo?.extra?.eas?.projectId;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return undefined;
    }
    addNotificationHandler();
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

/**
 * @param portfoliosAccess
 * @returns The key to the Porfolio Access group
 */
const getPortfolioAccessGroupKey = (portfoliosAccess: PortfolioAccessSchema) => {
  if (portfoliosAccess.investmentUserSSN === portfoliosAccess.portfolioOwnerSSN) {
    return SelectPortfoliosScreenText.MyPortfolios;
  }
  return portfoliosAccess.portfolioOwnerName;
};

/**
 * @param portfoliosAccess
 * @returns Returns Portfolio Accesses grouped after Portfolio owner name
 */
export const getGroupedPortfolioAccess = (portfolioAccess: Array<PortfolioAccessSchema>): GroupedPortfolioAccess => {
  return portfolioAccess.reduce<GroupedPortfolioAccess>((acc, curr) => {
    const key = getPortfolioAccessGroupKey(curr);
    if (!acc[key]) {
      acc[key] = [curr];
    } else {
      acc[key].push(curr);
    }
    return acc;
  }, {});
};

/**
 * @param groupedTransactions
 * @returns Returns a list of portfolio access group keys
 */
// TODO: Move this sorting into the getGroupedPortfolioAccess function
export const getSortedPortfolioAccessGroupHeaders = (groupedTransactions: GroupedPortfolioAccess) => {
  return Object.keys(groupedTransactions).sort((a, b) => {
    if (b === SelectPortfoliosScreenText.MyPortfolios) return 1;
    if (a === SelectPortfoliosScreenText.MyPortfolios || a < b) return -1;
    return 1;
  });
};

export const getInstrumentGraphFilters = (): InstrumentPeriodPill[] => {
  return [
    { type: Period.THIS_YEAR, text: getCurrentYear() },
    { type: Period.ONE_WEEK, text: PeriodText.OneWeekShort },
    { type: Period.ONE_MONTH, text: PeriodText.OneMonthShort },
    { type: Period.SIX_MONTHS, text: PeriodText.SixMonthsShort },
    { type: Period.ONE_YEAR, text: PeriodText.OneYearShort },
    { type: Period.FIVE_YEARS, text: PeriodText.FiveYearsShort },
    { type: Period.MAX, text: PeriodText.Max },
  ];
};

export const getPortfoliosPerformanceId = (selectedPortfolioIds: number[], period: Period, date: Date) => {
  const dateFrom = getFromDateForPeriod(period, date);
  if (dateFrom && selectedPortfolioIds.length > 0) {
    const formattedDateFrom = getFormattedDateWithoutTime(dateFrom);
    const formattedDateTo = getFormattedDateWithoutTime(date);
    return `${selectedPortfolioIds}_${formattedDateFrom}_${formattedDateTo}`;
  }
  return null;
};

export const getValueColor = (value: number) => {
  if (value > 0) {
    return Colors.successDark100;
  }
  if (value < 0) {
    return Colors.negativeDark100;
  }
  return Colors.gold150;
};

export const getButtonTextColor = (disabled?: boolean) => {
  if (disabled) {
    return Colors.goldGray600;
  }
  return Colors.gold150;
};

/**
 * Function to get the scroll offset for focusing the correct location in the pill list, so that the
 * closest pills and scroll direction are taken into account
 *
 * @param normalizedIndex The normalized index of the target pill
 * @param filters All the pill filters
 * @returns
 */

export const getFlatListOffset = (normalizedIndex: number, filters: Pill[]) => {
  const { width } = Dimensions.get('window');
  const length = filters.length > 0 ? filters.length : 1;
  const offset = (width / length) * normalizedIndex;
  return offset;
};

export const getCurrentYear = () => {
  return new Date().getFullYear().toString();
};

export const getScaledPixels = (initalPixelValue: number) => {
  return initalPixelValue * PixelRatio.getFontScale();
};
