import * as React from 'react';
import { Pressable } from 'react-native';

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';

type Props = {
  href: string;
  openInDeviceBrowser?: boolean;
  children: React.ReactNode;
};

const KvikaLink = ({ href, openInDeviceBrowser = false, children }: Props) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (openInDeviceBrowser) {
      Linking.openURL(href);
    } else {
      WebBrowser.openBrowserAsync(href);
    }
  };

  return <Pressable onPress={handlePress}>{children}</Pressable>;
};

export default KvikaLink;
