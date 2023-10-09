import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApiError } from '@kvika/api-client';
import { Colors } from '@kvika/theme';
import { useSelector, useDispatch } from 'react-redux';

import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { AppState } from 'react-native';
import ScreenWrapper from '../components/Layout/ScreenWrapper';
import OverviewScreen from '../screens/OverviewScreen/OverviewScreen';
import AssetsScreen from '../screens/AssetsScreen/AssetsScreen';
import TransactionsScreen from '../screens/TransactionsScreen/TransactionsScreen';
import Overview from '../svg/Overview';
import Transactions from '../svg/Transactions';
import Assets from '../svg/Assets';
import KvikaApiClient from '../api/KvikaApiClient';
import { NonBackableScreens, Screen } from './Routes';
import { FontSize, FontWeight } from '../dls/StyleGuide';
import { HomeScreenWrapperProps } from './NavigationTypes';
import { HomeScreenText } from '../constants/Text';
import { deleteBiometricsPreference } from '../utils/Biometrics/BiometricsUtils';
import { logout } from '../store/user';
import { deleteAuthToken } from '../api/AuthenticationStorage';
import { errorHandling } from '../utils/ErrorUtils';
import { selectPeriod, selectPortfolioIds } from '../store/ppid';
import { getElapsedMS } from '../utils/TimeUtils';
import { handleGetPortfoliosPerformance, handleGetPortfoliosPerformanceTransactions } from '../utils/ApiClientUtils';

const Tab = createBottomTabNavigator();
const REDIRECT_TO_SPLASHSCREEN_MAX_ELAPSED_MS = 60000; // 1 Minute

const getOverviewIcon = (focused: boolean) => {
  return <Overview height={24} width={24} color={focused ? Colors.gold400 : Colors.goldGray500} />;
};

const getTransactionsIcon = (focused: boolean) => {
  return <Transactions height={24} width={24} color={focused ? Colors.gold400 : Colors.goldGray500} />;
};

const getAssetIcon = (focused: boolean) => {
  return <Assets height={24} width={24} color={focused ? Colors.gold400 : Colors.goldGray500} />;
};

const HomeScreenWrapper = ({ navigation, route }: HomeScreenWrapperProps) => {
  // Clearing the navigation stack of all screens that the user should not be able to go back to.
  React.useEffect(() => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((r) => !NonBackableScreens.includes(r.name as Screen));
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }, [navigation]);

  const isAppleReviewer = route.params?.isAppleReviewer;
  const period = useSelector(selectPeriod);
  const portfolioIds = useSelector(selectPortfolioIds);
  const dispatch = useDispatch();

  const [splashScreenTimer, setSplashScreenTimer] = React.useState(new Date());

  useFocusEffect(
    React.useCallback(() => {
      const { remove: removeEventListener } = AppState.addEventListener('change', (nextAppStateStatus) => {
        if (nextAppStateStatus === 'active') {
          const elapsedTime = getElapsedMS({ startDate: new Date(splashScreenTimer), endDate: new Date() });
          if (elapsedTime > REDIRECT_TO_SPLASHSCREEN_MAX_ELAPSED_MS) {
            navigation.replace('SplashScreen');
          } else {
            setSplashScreenTimer(new Date());
          }
        }
        if (nextAppStateStatus === 'background' || nextAppStateStatus === 'inactive') {
          setSplashScreenTimer(new Date());
        }
      });

      return () => {
        removeEventListener();
      };
    }, [navigation, splashScreenTimer])
  );

  const handleLogOut = () => {
    KvikaApiClient.getApiClient({ dispatch }).then((client) => {
      client
        .logout()
        .then(() => {
          deleteAuthToken().then(() => {
            navigation.replace(Screen.LoginScreen, { hasAuthToken: false });
            deleteBiometricsPreference();
            dispatch(logout());
          });
        })
        .catch((error: ApiError) => {
          errorHandling({ error });
        });
    });
  };

  const handleLogoPress = () => {
    navigation.navigate(Screen.OverviewScreen);
  };

  React.useEffect(() => {
    if (!isAppleReviewer) {
      handleGetPortfoliosPerformance(dispatch, period, portfolioIds);
      handleGetPortfoliosPerformanceTransactions(dispatch, period, portfolioIds, 1);
    }
  }, [portfolioIds, period, dispatch, isAppleReviewer]);

  return (
    <ScreenWrapper onLogOut={handleLogOut} isAppleReviewer={isAppleReviewer} onLogoPress={handleLogoPress}>
      <Tab.Navigator
        initialRouteName={Screen.OverviewScreen}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.black5,
            height: 68,
            paddingBottom: 6,
            paddingTop: 6,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: Colors.gold150,
          tabBarLabelStyle: {
            fontSize: FontSize.BodySmall,
            fontWeight: `${FontWeight.Medium}`,
          },
          unmountOnBlur: true,
        }}
      >
        <Tab.Screen
          name={Screen.OverviewScreen}
          component={OverviewScreen}
          options={{
            tabBarLabel: HomeScreenText.Overview,
            tabBarIcon: ({ focused }) => getOverviewIcon(focused),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={Screen.AssetsScreen}
          component={AssetsScreen}
          options={{
            tabBarLabel: HomeScreenText.Assets,
            tabBarIcon: ({ focused }) => getAssetIcon(focused),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={Screen.TransactionsScreen}
          component={TransactionsScreen}
          options={{
            tabBarLabel: HomeScreenText.Transactions,
            tabBarIcon: ({ focused }) => getTransactionsIcon(focused),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </ScreenWrapper>
  );
};

export default HomeScreenWrapper;
