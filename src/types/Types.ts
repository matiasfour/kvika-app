import {
  DisruptionTypeEnum,
  PortfolioAccessSchema,
  PortfolioTransactionSchema,
  PortfolioTransactionTypeEnum,
} from '@kvika/api-types';
import { AssetScreenText, PeriodText, TransactionsScreenText, TransactionTypesText } from '../constants/Text';

export type ValueOf<T> = T[keyof T];

export type SVGProps = {
  title?: string;
  titleId?: string;
  width?: number;
  height?: number;
  vbHeight?: number;
  vbWidth?: number;
  color?: string;
  fillWithColor?: boolean;
};

export class EmptyAuthTokenError extends Error {}

export type SelectedTab = {
  index: number;
  tabTitle: string;
};

export type HoldingPair = {
  portfolioId: number;
  instrumentId: number;
};

export type GroupedPortfolioAccess = {
  [key: string]: Array<PortfolioAccessSchema>;
};

export enum Drawer {
  PORTFOLIO_PICKER = 'PORTFOLIO_PICKER',
  PERIOD_PICKER = 'PERIOD_PICKER',
  PROFILE = 'PROFILE',
  ASSET = 'ASSET',
  TRANSACTION = 'TRANSACTION',
}

export enum AssetType {
  ALL_ASSETS = 'Allar eignir',
  BOND = 'BOND',
  FUND = 'FUND',
  EQUITY = 'EQUITY',
  DEPOSIT = 'DEPOSIT',
  OTHER = 'Annað',
}

export type AssetPill = {
  type: AssetType;
  text: AssetScreenText;
};

export type TransactionPill = {
  types: PortfolioTransactionTypeEnum[];
  text: TransactionsScreenText | TransactionTypesText;
};

export enum Period {
  THIS_YEAR = 'this_year',
  ONE_WEEK = '1v',
  ONE_MONTH = '1m',
  SIX_MONTHS = '6m',
  ONE_YEAR = '1y',
  FIVE_YEARS = '5y',
  MAX = 'max',
}

export type InstrumentPeriodPill = {
  type: Period;
  text: PeriodText | string;
};

export type Pill = AssetPill | TransactionPill | InstrumentPeriodPill;

export type CategorySums = Record<string, number>;

export type CategoryComposition = {
  category: string;
  percentage: number;
  value: number;
};

export enum SegmentTrackingId {
  FocusAssetComposition = 'Focus On Asset Category',
  LoginStarted = 'User Login Inititated',
  LoginCompleted = 'User Login Completed',
  LoginFailed = 'User Login Failed',
  LoginStartFailed = 'User Login Start Failed',
  Logout = 'User Logged Out',
  RegistrationStarted = 'Registration Started',
  RegistrationCompleted = 'Registration Completed',
  RegistrationFailed = 'Registration Failed',
  TermsViewed = 'Terms Viewed',
  TermsApproved = 'Terms Approved',
  BiometricLoginStarted = 'Biometric Login Started',
  BiometricLoginCompleted = 'Biometric Login Completed',
  BiometricSwitchToggle = 'Biometrics Settings Toggle',
  OpenUserProfile = 'Profile Screen Opened',
  OpenAssets = 'Assets Screen Opened',
  OpenOverview = 'Overview Screen Opened',
  OpenTransactions = 'Transactions Screen Opened',
  PeriodPicked = 'Period Picked',
  PortfolioPicked = 'Portfolio Picked',
  SelectAssetsFilter = 'Asset Filter Selected',
  SelectTransactionsFilter = 'Transactions Filter Selected',
  TimePeriodChanged = 'Time Period Change',
  ScrollInGraph = 'Scrolled In Graph',
  SwitchProfile = 'Switched Profile',
  ViewAssetDetails = 'View Asset Details',
  ViewTransactionDetails = 'View Transactions Details',
}

export enum ProfilePageIndex {
  ProfileInfo = 0,
  Users = 1,
  Portfolios = 2,
}

export type PagedTransactions = Record<number, PortfolioTransactionSchema[]>;

export type ServiceStatusMode = {
  serviceStatus?: DisruptionTypeEnum;
  message?: string;
  showAfter?: string;
};

export type LoginStatusProps = {
  loginToken?: string;
  firstTime: number;
  secondTime: number;
  lastPollingTime: Date;
};

export type SelectionState = {
  start: number;
  end: number;
};
