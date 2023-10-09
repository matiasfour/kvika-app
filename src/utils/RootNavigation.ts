import { createNavigationContainerRef } from '@react-navigation/native';

import { StackParamList } from '../navigation/NavigationTypes';
import { ValueOf } from '../types/Types';

export const navigationRef = createNavigationContainerRef<StackParamList>();

export const navigate = (screen: keyof StackParamList, params?: ValueOf<StackParamList>) => {
  if (navigationRef.isReady()) {
    // TODO: Fix typing, this allows for screen A to be navigated with screen B props
    navigationRef.navigate(screen, params);
  }
};
