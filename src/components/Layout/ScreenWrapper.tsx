import * as React from 'react';

import styled from 'styled-components/native';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Colors } from '@kvika/theme';
import { useAnalytics } from '@segment/analytics-react-native';
import { Drawer, SegmentTrackingId } from '../../types/Types';
import KvikaHeader from '../KvikaHeader/KvikaHeader';
import HeaderDrawers from '../Drawer/HeaderDrawers';

type Props = {
  children: React.ReactNode;
  onLogOut: () => void;
  isAppleReviewer?: boolean;
  onLogoPress: () => void;
};

const StyledView = styled.View`
  flex: 1;
  background-color: ${Colors.black3};
`;

const ScreenWrapper = ({ children, onLogOut, isAppleReviewer = false, onLogoPress }: Props) => {
  const periodPickerRef = React.useRef<BottomSheetModal>(null);
  const profileRef = React.useRef<BottomSheetModal>(null);
  const portfolioPickerRef = React.useRef<BottomSheetModal>(null);

  const { dismiss } = useBottomSheetModal();
  const { track } = useAnalytics();

  const handleDismiss = React.useCallback(
    (drawer: Drawer) => {
      dismiss(drawer);
    },
    [dismiss]
  );

  const handlePresentPress = React.useCallback((bottomSheetRef: React.RefObject<BottomSheetModal>) => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  }, []);

  const handlePeriodPickerPress = () => {
    handlePresentPress(periodPickerRef);
    dismiss(); // Close the drawer that was last opened - this is useful in case the user doesn't close the current drawer but rather opens a new one
  };

  const handlePortfolioPickerPress = () => {
    handlePresentPress(portfolioPickerRef);
    dismiss(); // Close the drawer that was last opened
  };

  const handleProfilePress = () => {
    handlePresentPress(profileRef);
    dismiss(); // Close the drawer that was last opened
    track(SegmentTrackingId.OpenUserProfile);
  };

  return (
    <StyledView>
      <KvikaHeader
        onPeriodPickerPress={handlePeriodPickerPress}
        onPortfolioPickerPress={handlePortfolioPickerPress}
        onProfilePress={handleProfilePress}
        isAppleReviewer={isAppleReviewer}
        onLogOut={onLogOut}
        onLogoPress={onLogoPress}
      />
      {children}
      <HeaderDrawers
        onLogout={() => {
          onLogOut();
          handleDismiss(Drawer.PROFILE);
        }}
        onDismiss={handleDismiss}
        profileRef={profileRef}
        periodPickerRef={periodPickerRef}
        portfolioPickerRef={portfolioPickerRef}
      />
    </StyledView>
  );
};

export default ScreenWrapper;
