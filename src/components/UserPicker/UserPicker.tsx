import { InvestmentUserResponseSchema } from '@kvika/api-types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectAvailableUserAccounts } from '../../store/userAccount';
import KvikaRadioButton from '../KvikaRadioButton/KvikaRadioButton';
import { StyledContentContainer, StyledRow, StyledView } from './UserPickerStyles';

type Props = {
  setIsSelectedInvestmentUser: (user: InvestmentUserResponseSchema) => void;
  selectedInvestmentUser: InvestmentUserResponseSchema | undefined;
};

const UserPicker = ({ setIsSelectedInvestmentUser, selectedInvestmentUser }: Props) => {
  const availableUserAccounts = useSelector(selectAvailableUserAccounts);

  return (
    <StyledView>
      <StyledContentContainer>
        {availableUserAccounts.map((user, index) => {
          const selected = selectedInvestmentUser?.investmentUserId === user.investmentUserId;
          return (
            <StyledRow key={`${user.investmentUserId + index}`}>
              <KvikaRadioButton
                isChecked={selected}
                label={user.displayName}
                onChange={() => setIsSelectedInvestmentUser(user)}
              />
            </StyledRow>
          );
        })}
      </StyledContentContainer>
    </StyledView>
  );
};
export default UserPicker;
