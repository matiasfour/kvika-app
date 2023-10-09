import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from './Routes';

export type StackParamList = {
  SplashScreen: undefined;
  OverviewScreen: undefined;
  AssetsScreen: undefined;
  TransactionsScreen: undefined;
  LoginScreen: { hasAuthToken: boolean };
  SelectPortfoliosScreen: undefined;
  TermsAndConditionsScreen: undefined;
  HomeScreenWrapper: { isAppleReviewer: boolean } | undefined;
  UserScreen: undefined;
};

export type SplashScreenProps = NativeStackScreenProps<StackParamList, Screen.SplashScreen>;
export type OverviewScreenProps = NativeStackScreenProps<StackParamList, Screen.OverviewScreen>;
export type AssetsScreenProps = NativeStackScreenProps<StackParamList, Screen.AssetsScreen>;
export type TransactionsScreenProps = NativeStackScreenProps<StackParamList, Screen.TransactionsScreen>;
export type LoginScreenProps = NativeStackScreenProps<StackParamList, Screen.LoginScreen>;
export type SelectPortfoliosScreenProps = NativeStackScreenProps<StackParamList, Screen.SelectPortfoliosScreen>;
export type TermsAndConditionsScreenProps = NativeStackScreenProps<StackParamList, Screen.TermsAndConditionsScreen>;
export type HomeScreenWrapperProps = NativeStackScreenProps<StackParamList, Screen.HomeScreenWrapper>;
export type UserScreenProps = NativeStackScreenProps<StackParamList, Screen.UserScreen>;
