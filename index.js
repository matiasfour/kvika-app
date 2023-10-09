import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

LogBox.ignoreLogs([
  'Face ID is not available',
  "The package 'sovran-react-native' doesn't seem to be linked",
  "The package 'analytics-react-native' can't access a custom native module.",
]);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
