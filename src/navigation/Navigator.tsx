import * as React from 'react';
import { Alert, AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DisruptionTypeEnum } from '@kvika/api-types';
import { decodeBase64String } from '@kvika/string-utils';
import * as RootNavigation from '../utils/RootNavigation';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen/TermsAndConditionsScreen';
import SelectPortfoliosScreen from '../screens/SelectPortfoliosScreen/SelectPortfoliosScreen';
import HomeScreenWrapper from './HomeScreenWrapper';
import { StackParamList } from './NavigationTypes';
import { Screen } from './Routes';
import {
  selectCurrAppStateStatus,
  selectServiceStatusMode,
  setAppStateStatus,
  updateServiceStatusMode,
} from '../store/appStateStatus';
import UserScreen from '../screens/UserScreen/UserScreen';
import { GeneralText } from '../constants/Text';

const Stack = createNativeStackNavigator<StackParamList>();

const Navigator = () => {
  const dispatch = useDispatch();
  const currStatus = useSelector(selectCurrAppStateStatus);
  const serviceStatusMode = useSelector(selectServiceStatusMode);
  const { showAfter, serviceStatus } = serviceStatusMode;

  const disruptionMessage = serviceStatusMode.message ? serviceStatusMode.message : GeneralText.DisruptionModeText;
  React.useEffect(() => {
    const { remove: removeEventListener } = AppState.addEventListener('change', (nextAppStateStatus) => {
      dispatch(setAppStateStatus({ prevStatus: currStatus, currStatus: nextAppStateStatus, serviceStatusMode: {} }));
    });

    return () => {
      removeEventListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMinutes = (numOfMinutes: number, date: Date) => {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
  };

  React.useEffect(() => {
    if (serviceStatus === DisruptionTypeEnum.EXTERNAL) {
      // Only show alert and update when it should next be shown if
      // 1) we've never shown it before or
      // 2) we have shown it but it's time for it to be shown again
      if (!showAfter || (showAfter && new Date(showAfter) <= new Date())) {
        Alert.alert('', decodeBase64String(disruptionMessage));
        dispatch(updateServiceStatusMode({ showAfter: addMinutes(15, new Date()).toISOString() }));
      }
    }
  }, [dispatch, disruptionMessage, serviceStatus, showAfter]);

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <Stack.Navigator initialRouteName={Screen.SplashScreen} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screen.HomeScreenWrapper} component={HomeScreenWrapper} options={{ headerShown: false }} />
        <Stack.Screen name={Screen.SplashScreen} component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Group>
          <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name={Screen.TermsAndConditionsScreen}
            component={TermsAndConditionsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Screen.SelectPortfoliosScreen}
            component={SelectPortfoliosScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={Screen.UserScreen} component={UserScreen} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
