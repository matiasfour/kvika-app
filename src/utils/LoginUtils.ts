import { ApiError } from '@kvika/api-client';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import KvikaApiClient from '../api/KvikaApiClient';
import { StackParamList } from '../navigation/NavigationTypes';
import { updatePortfolioAccess } from '../store/portfolio';
import { errorHandling } from './ErrorUtils';
import { Screen } from '../navigation/Routes';
import { promptUserForBiometricPreference } from './Biometrics/BiometricsUtils';
import { updatePortfolioIds } from '../store/ppid';

type Options = {
  navigation: NativeStackNavigationProp<
    StackParamList,
    Screen.LoginScreen | Screen.TermsAndConditionsScreen | Screen.UserScreen
  >;
  dispatch: Dispatch<AnyAction>;
  investmentUserId: string;
  setIsLoading?: (isLoading: boolean) => void;
  canGoBack?: boolean;
};

export const postSelectedInvesmentUserAndGetPortfolioAccess = ({
  investmentUserId,
  dispatch,
  navigation,
  setIsLoading,
  canGoBack,
}: Options) => {
  KvikaApiClient.getApiClient({ dispatch }).then((client) => {
    client
      .postSelectedInvestmentUser({ investmentUserId })
      .then(() => {
        client
          .getPortfolioAccessForSelectedUser()
          .then((portfolioAccess) => {
            dispatch(updatePortfolioAccess(portfolioAccess));
            // If there is only one portfolio we add that to the selected portfolios and route to the overview screen
            if (portfolioAccess.length === 1) {
              const portfolioIds = portfolioAccess.map((portfolio) => portfolio.portfolioId);
              dispatch(updatePortfolioIds(portfolioIds));
              promptUserForBiometricPreference();
              navigation.replace(Screen.HomeScreenWrapper);
            } else if (canGoBack) {
              navigation.push(Screen.SelectPortfoliosScreen);
            } else {
              navigation.replace(Screen.SelectPortfoliosScreen);
            }
            setIsLoading && setIsLoading(false);
          })
          .catch((error: ApiError) => {
            errorHandling({ error });
          });
      })
      .catch((error: ApiError) => {
        errorHandling({ error });
      });
  });
};
