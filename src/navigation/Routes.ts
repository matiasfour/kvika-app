export enum Screen {
  SplashScreen = 'SplashScreen',
  OverviewScreen = 'OverviewScreen',
  AssetsScreen = 'AssetsScreen',
  TransactionsScreen = 'TransactionsScreen',
  TermsAndConditionsScreen = 'TermsAndConditionsScreen',
  SelectPortfoliosScreen = 'SelectPortfoliosScreen',
  LoginScreen = 'LoginScreen',
  HomeScreenWrapper = 'HomeScreenWrapper',
  UserScreen = 'UserScreen',
}

export const NonBackableScreens = [
  Screen.SplashScreen,
  Screen.TermsAndConditionsScreen,
  Screen.SelectPortfoliosScreen,
  Screen.LoginScreen,
  Screen.UserScreen,
];
