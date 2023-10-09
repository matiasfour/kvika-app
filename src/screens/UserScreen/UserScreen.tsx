import { InvestmentUserResponseSchema } from '@kvika/api-types';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserPicker from '../../components/UserPicker/UserPicker';
import KvikaButton from '../../components/KvikaButton/KvikaButton';
import KvikaLoginHeader from '../../components/KvikaLoginHeader/KvikaLoginHeader';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import { GeneralText, UserScreenText } from '../../constants/Text';
import { UserScreenProps } from '../../navigation/NavigationTypes';
import {
  selectAvailableUserAccounts,
  selectSelectedUserAccount,
  updateSelectedUserAccount,
} from '../../store/userAccount';
import { postSelectedInvesmentUserAndGetPortfolioAccess } from '../../utils/LoginUtils';
import { StyledButtonContainer, StyledContainer } from './UserScreenStyles';

const UserScreen = ({ navigation }: UserScreenProps) => {
  const selectedUserAccount = useSelector(selectSelectedUserAccount);
  const availableUserAccounts = useSelector(selectAvailableUserAccounts);
  const [selectedInvestmentUser, setIsSelectedInvestmentUser] = React.useState<
    InvestmentUserResponseSchema | undefined
  >(selectedUserAccount);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!selectedInvestmentUser && availableUserAccounts.length > 0) {
      setIsSelectedInvestmentUser(availableUserAccounts[0]);
    }
  }, [availableUserAccounts, selectedInvestmentUser]);

  const onPress = () => {
    if (selectedInvestmentUser) {
      setIsLoading(true);
      dispatch(updateSelectedUserAccount(selectedInvestmentUser));
      postSelectedInvesmentUserAndGetPortfolioAccess({
        investmentUserId: selectedInvestmentUser.investmentUserId,
        dispatch,
        navigation,
        setIsLoading,
        canGoBack: true,
      });
    }
  };

  return (
    <ScreenLayout backgroundColor={Colors.black5}>
      <KvikaLoginHeader
        title={UserScreenText.ChooseUser}
        description={UserScreenText.LoginWithFollowingUsers}
        logo={require('../../../assets/images/icon_transparent_bg.png')}
      />
      <StyledContainer>
        <UserPicker
          selectedInvestmentUser={selectedInvestmentUser}
          setIsSelectedInvestmentUser={setIsSelectedInvestmentUser}
        />
      </StyledContainer>
      <StyledButtonContainer>
        <KvikaButton
          title={GeneralText.Forward}
          onPress={onPress}
          isLoading={isLoading}
          disabled={!selectedInvestmentUser || availableUserAccounts.length < 1}
        />
      </StyledButtonContainer>
    </ScreenLayout>
  );
};
export default UserScreen;
