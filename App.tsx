import * as React from 'react';
import 'expo-dev-client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Font from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@kvika/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AnalyticsProvider, createClient } from '@segment/analytics-react-native';

import * as Sentry from 'sentry-expo';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';
import { Platform } from 'react-native';
import store, { persistor } from './src/store';
import Navigator from './src/navigation/Navigator';
import { getEnvironment, isProd } from './src/env/Environment';
import IOSSecurityOverlay from './src/components/SecurityOverlays/IOSSecurityOverlay';

// Keep the splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync().catch(() => {
  /* Reloading the app (i.e. via expo-updates API) might trigger some race conditions, ignore them */
});

const segmentClient = createClient({
  writeKey: getEnvironment(process.env.EXPO_ENV).segmentWriteKey,
  trackAppLifecycleEvents: true, // This is reccomended by Segment docs, this can be removed if unwanted
});

Sentry.init({
  dsn: getEnvironment(process.env.EXPO_ENV).sentryDSN,
  enableInExpoDevelopment: true,
  environment: isProd() ? 'production' : 'staging',
});

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.black5};
`;

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, we can also make any other async calls here before app is ready
        await Font.loadAsync({
          'AkzidenzGroteskPro-Regular': require('./assets/fonts/AkzidenzGroteskPro-Regular.otf'),
          'AkzidenzGroteskPro-Italic': require('./assets/fonts/AkzidenzGroteskPro-Italic.otf'),
          'AkzidenzGroteskPro-Bold': require('./assets/fonts/AkzidenzGroteskPro-Bold.otf'),
          'AkzidenzGroteskPro-Medium': require('./assets/fonts/AkzidenzGroteskPro-Medium.otf'),
          'AkzidenzGroteskPro-Light': require('./assets/fonts/AkzidenzGroteskPro-Light.otf'),
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen (Expo config splash, not our SplashScreen component)
      // to hide immediately! If we call this after "setAppIsReady", then we may see
      // a blank (white) screen while the app is loading its initial state and rendering its first pixels.
      // So instead, we hide the splash screen once we know the root view has already performed layout.
      await ExpoSplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AnalyticsProvider client={segmentClient}>
              <StyledSafeAreaView>
                <BottomSheetModalProvider>
                  <StatusBar style="light" />
                  <Navigator />
                </BottomSheetModalProvider>
              </StyledSafeAreaView>
            </AnalyticsProvider>
            {Platform.OS === 'ios' ? <IOSSecurityOverlay /> : null}
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
