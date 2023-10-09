import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ApiError } from '@kvika/api-client';
import { InvestmentUserResponseSchema } from '@kvika/api-types';
import { useAnalytics } from '@segment/analytics-react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, PixelRatio } from 'react-native';
import KvikaApiClient from '../../api/KvikaApiClient';
import { GeneralText, ProfileDrawerText } from '../../constants/Text';
import { clearPortfoliosPerformance, selectPortfolioAccess, updatePortfolioAccess } from '../../store/portfolio';
import { selectSelectedUserAccount, updateSelectedUserAccount } from '../../store/userAccount';
import LogOut from '../../svg/LogOut';
import { Drawer, Period, ProfilePageIndex, SegmentTrackingId } from '../../types/Types';
import { errorHandling } from '../../utils/ErrorUtils';
import BottomDrawer from './BottomDrawer/BottomDrawer';
import PeriodPicker from './PeriodPicker/PeriodPicker';
import PortfolioPicker from '../PortfolioPicker/PortfolioPicker';
import Profile from './Profile/Profile';
import { selectPeriod, selectPortfolioIds, updatePeriod, updatePortfolioIds } from '../../store/ppid';
import ProfileDrawer from './Profile/ProfileDrawer';

// 72 is the height of each portfolio row according to the figma designs, we incorporate the font scale to adjust to different font sizes
const PORTFOLIO_ROW_HEIGHT = 72 * PixelRatio.getFontScale();

type Props = {
  onLogout: () => void;
  onDismiss: (drawer: Drawer) => void;
  periodPickerRef: React.RefObject<BottomSheetModal>;
  portfolioPickerRef: React.RefObject<BottomSheetModal>;
  profileRef: React.RefObject<BottomSheetModal>;
};

const HeaderDrawers = ({ onLogout, onDismiss, periodPickerRef, portfolioPickerRef, profileRef }: Props) => {
  const selectedUserAccount = useSelector(selectSelectedUserAccount);
  const storedPeriod = useSelector(selectPeriod);
  const storedPortfolioIds = useSelector(selectPortfolioIds);
  const portfolioAccess = useSelector(selectPortfolioAccess);

  const [selectedPeriod, setSelectedPeriod] = React.useState<Period>(storedPeriod);
  const [selectedPortfolioIds, setSelectedPortfolioIds] = React.useState<number[]>(storedPortfolioIds);
  const [selectedProfilePage, setSelectedProfilePage] = React.useState<ProfilePageIndex>(ProfilePageIndex.ProfileInfo);
  const [selectedInvestmentUser, setSelectedInvestmentUser] = React.useState<
    InvestmentUserResponseSchema | undefined
  >();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasStaticHeight, setHasStaticHeight] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const { track } = useAnalytics();

  useEffect(() => {
    setSelectedInvestmentUser(selectedUserAccount);
  }, [selectedUserAccount]);

  const handleResetAndDismiss = (drawer: Drawer) => {
    setSelectedPeriod(storedPeriod);
    setSelectedPortfolioIds(storedPortfolioIds);
    setSelectedProfilePage(ProfilePageIndex.ProfileInfo);
    onDismiss(drawer);
  };

  const postSelectedUserAndGetPortfolioAccess = () => {
    if (selectedInvestmentUser === selectedUserAccount) {
      if (portfolioAccess.length === 1) {
        handleResetAndDismiss(Drawer.PROFILE);
      } else {
        setSelectedProfilePage(ProfilePageIndex.Portfolios);
      }
    } else if (selectedInvestmentUser) {
      setIsLoading(true);
      KvikaApiClient.getApiClient({ dispatch }).then((client) => {
        client
          .postSelectedInvestmentUser({ investmentUserId: selectedInvestmentUser.investmentUserId })
          .then(() => {
            dispatch(updateSelectedUserAccount(selectedInvestmentUser));
            // Clear portfolios performance data first to avoid showing old data if the coming GET call fails
            dispatch(clearPortfoliosPerformance());
            client
              .getPortfolioAccessForSelectedUser()
              .then((portfolioAccessResponse) => {
                dispatch(updatePortfolioAccess(portfolioAccessResponse));
                const portfolioIds = portfolioAccessResponse.map((portfolio) => portfolio.portfolioId);
                // Default to every portfolio being selected
                dispatch(updatePortfolioIds(portfolioIds));
                setSelectedPortfolioIds(portfolioIds);
                // If the user has only access to one portfolio we skip the select portfolio page and just close the drawer
                if (portfolioAccessResponse.length === 1) {
                  handleResetAndDismiss(Drawer.PROFILE);
                } else {
                  setSelectedProfilePage(ProfilePageIndex.Portfolios);
                }
                setIsLoading(false);
              })
              .catch((error: ApiError) => {
                setIsLoading(false);
                errorHandling({ error });
              });
          })
          .catch((error: ApiError) => {
            setIsLoading(false);
            errorHandling({ error });
          });
      });
    } else {
      handleResetAndDismiss(Drawer.PROFILE);
    }
  };

  const onConfirmPortfolioPicker = () => {
    const sortedStoredPortfolioIds = [...storedPortfolioIds].sort().toString();
    const sortedPortfolioIds = [...selectedPortfolioIds].sort().toString();
    if (sortedStoredPortfolioIds !== sortedPortfolioIds) {
      dispatch(updatePortfolioIds(selectedPortfolioIds));
    }
    onDismiss(Drawer.PORTFOLIO_PICKER);
    track(SegmentTrackingId.PortfolioPicked, { portfolio: selectedPortfolioIds });
  };

  const onConfirmProfile = () => {
    switch (selectedProfilePage) {
      case ProfilePageIndex.ProfileInfo: {
        onLogout();
        onDismiss(Drawer.PROFILE);
        break;
      }
      case ProfilePageIndex.Users: {
        postSelectedUserAndGetPortfolioAccess();
        break;
      }
      case ProfilePageIndex.Portfolios: {
        dispatch(updatePortfolioIds(selectedPortfolioIds));
        setSelectedProfilePage(ProfilePageIndex.ProfileInfo);
        onDismiss(Drawer.PROFILE);
        break;
      }
      default:
        break;
    }
  };

  const onSwitchProfile = () => {
    track(SegmentTrackingId.SwitchProfile);
    setSelectedProfilePage(ProfilePageIndex.Users);
  };

  const onBackPress = () => {
    switch (selectedProfilePage) {
      case ProfilePageIndex.Users:
        setSelectedProfilePage(ProfilePageIndex.ProfileInfo);
        break;
      case ProfilePageIndex.Portfolios:
        setSelectedProfilePage(ProfilePageIndex.Users);
        break;
      default:
    }
  };

  const isProfileInfoPage = () => {
    return selectedProfilePage === ProfilePageIndex.ProfileInfo;
  };

  const getDisabled = () => {
    switch (selectedProfilePage) {
      case ProfilePageIndex.Users:
        return selectedInvestmentUser === undefined;

      case ProfilePageIndex.Portfolios:
        return selectedPortfolioIds.length === 0;

      default:
        return false;
    }
  };

  const handleOnPeriodPress = (period: Period) => {
    setSelectedPeriod(period);
    track(SegmentTrackingId.TimePeriodChanged, { period });
    dispatch(updatePeriod(period));
    setTimeout(() => {
      onDismiss(Drawer.PERIOD_PICKER);
    }, 250);
  };

  React.useEffect(() => {
    const totalPortfoliosHeight = PORTFOLIO_ROW_HEIGHT * storedPortfolioIds.length;
    const allowedPortfoliosHeight = Dimensions.get('window').height * 0.8;
    // If the height of the portfolio picker is more than 80% of the screen height we set the height to static, to ensure that the drawer is scrollable
    if (totalPortfoliosHeight > allowedPortfoliosHeight) {
      setHasStaticHeight(true);
    } else {
      setHasStaticHeight(false);
    }
  }, [storedPortfolioIds.length]);

  return (
    <>
      <BottomDrawer
        onDismiss={handleResetAndDismiss}
        ref={periodPickerRef}
        name={Drawer.PERIOD_PICKER}
        showFooter={false}
      >
        <PeriodPicker onPress={handleOnPeriodPress} selectedPeriod={selectedPeriod} />
      </BottomDrawer>
      <BottomDrawer
        onDismiss={handleResetAndDismiss}
        onConfirm={onConfirmPortfolioPicker}
        ref={portfolioPickerRef}
        name={Drawer.PORTFOLIO_PICKER}
        disabled={selectedPortfolioIds.length === 0}
        hasStaticHeight={hasStaticHeight}
      >
        <PortfolioPicker
          selectedPortfolioIds={selectedPortfolioIds}
          setSelectedPortfolioIds={setSelectedPortfolioIds}
          hasMarginLeft
        />
      </BottomDrawer>
      <ProfileDrawer
        onConfirm={onConfirmProfile}
        confirmButtonIcon={isProfileInfoPage() && <LogOut />}
        confirmButtonText={isProfileInfoPage() ? ProfileDrawerText.LogOut : GeneralText.Forward}
        ref={profileRef}
        name={Drawer.PROFILE}
        onSwitchProfile={isProfileInfoPage() ? onSwitchProfile : undefined}
        isLoading={isLoading}
        disabled={getDisabled()}
        // Reset portfolio IDs to stored ones if user dismisses drawer in case user changed selection but didn't confirm
        onDismiss={() => {
          setSelectedPortfolioIds(storedPortfolioIds);
          setSelectedProfilePage(ProfilePageIndex.ProfileInfo);
        }}
        dismissOnConfirm={false}
        showBackButton={false}
      >
        <Profile
          onLogout={onLogout}
          selectedProfilePage={selectedProfilePage}
          onBackPress={onBackPress}
          selectedInvestmentUser={selectedInvestmentUser}
          setSelectedInvestmentUser={setSelectedInvestmentUser}
          setSelectedPortfolioIds={setSelectedPortfolioIds}
          selectedPortfolioIds={selectedPortfolioIds}
        />
      </ProfileDrawer>
    </>
  );
};

export default HeaderDrawers;
