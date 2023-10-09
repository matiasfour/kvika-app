/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
// import { useAnalytics } from '@segment/analytics-react-native';
import { InvestmentUserResponseSchema } from '@kvika/api-types';
import { StyledContainer } from './ProfileStyles';
import SelectUserPage from './SelectUserPage/SelectUserPage';
import SelectPortfolioPage from './SelectPortfolioPage/SelectPortfolioPage';
import ProfileInfoPage from './ProfileInfoPage/ProfileInfoPage';
import { ProfilePageIndex } from '../../../types/Types';

type Props = {
  onLogout: () => void;
  selectedProfilePage: ProfilePageIndex;
  onBackPress: () => void;
  selectedInvestmentUser: InvestmentUserResponseSchema | undefined;
  setSelectedInvestmentUser: (user: InvestmentUserResponseSchema) => void;
  selectedPortfolioIds: number[];
  setSelectedPortfolioIds: (holdings: number[]) => void;
};

const Profile = ({
  onLogout,
  selectedProfilePage,
  onBackPress,
  selectedInvestmentUser,
  setSelectedInvestmentUser,
  selectedPortfolioIds,
  setSelectedPortfolioIds,
}: Props) => {
  const renderContent = () => {
    switch (selectedProfilePage) {
      case ProfilePageIndex.Portfolios:
        return (
          <SelectPortfolioPage
            onBackPress={onBackPress}
            selectedPortfolioIds={selectedPortfolioIds}
            setSelectedPortfolioIds={setSelectedPortfolioIds}
          />
        );
      case ProfilePageIndex.Users:
        return (
          <SelectUserPage
            onBackPress={onBackPress}
            selectedInvestmentUser={selectedInvestmentUser}
            setSelectedInvestmentUser={setSelectedInvestmentUser}
          />
        );
      default:
        return <ProfileInfoPage onLogout={onLogout} />;
    }
  };

  return <StyledContainer>{renderContent()}</StyledContainer>;
};

export default Profile;
