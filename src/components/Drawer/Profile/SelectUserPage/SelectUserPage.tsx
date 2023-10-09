import { InvestmentUserResponseSchema } from '@kvika/api-types';
import * as React from 'react';
import { UserScreenText } from '../../../../constants/Text';
import UserPicker from '../../../UserPicker/UserPicker';
import ProfilePageHeader from '../ProfilePageHeader/ProfilePageHeader';

type Props = {
  onBackPress: () => void;
  selectedInvestmentUser: InvestmentUserResponseSchema | undefined;
  setSelectedInvestmentUser: (user: InvestmentUserResponseSchema) => void;
};

const SelectUserPage = ({ onBackPress, selectedInvestmentUser, setSelectedInvestmentUser }: Props) => {
  return (
    <>
      <ProfilePageHeader
        onBackPress={onBackPress}
        title={UserScreenText.ChooseUser}
        description={UserScreenText.LoginWithFollowingUsers}
      />
      <UserPicker
        selectedInvestmentUser={selectedInvestmentUser}
        setIsSelectedInvestmentUser={setSelectedInvestmentUser}
      />
    </>
  );
};
export default SelectUserPage;
