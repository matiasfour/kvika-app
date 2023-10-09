import * as React from 'react';
import { prettifySSN } from '@kvika/string-utils';

import { useSelector } from 'react-redux';
import { Colors } from '@kvika/theme';
import { FontSize, FontWeight } from '../../../../dls/StyleGuide';
import KvikaText from '../../../KvikaText';
import { getInitials } from '../../../../utils/Utils';
import { selectSelectedUserAccount } from '../../../../store/userAccount';
import { HeaderContainer, NameContainer, StyledCharCircle } from './ProfileInfoPageStyles';

const ProfileHeader = () => {
  const selectedUserAccount = useSelector(selectSelectedUserAccount);
  return (
    <HeaderContainer>
      <StyledCharCircle>
        {selectedUserAccount && (
          <KvikaText
            allowFontScaling={false}
            color={Colors.black5}
            fontSize={FontSize.H2}
            fontWeight={FontWeight.Medium}
          >
            {getInitials(selectedUserAccount.investmentUserName)}
          </KvikaText>
        )}
      </StyledCharCircle>
      {selectedUserAccount && (
        <NameContainer>
          <KvikaText color={Colors.gold150} fontSize={FontSize.BodyLarge} fontWeight={FontWeight.Medium}>
            {selectedUserAccount.investmentUserName}
          </KvikaText>
          <KvikaText color={Colors.goldGray400}>{prettifySSN(selectedUserAccount.investmentUserSSN)}</KvikaText>
        </NameContainer>
      )}
    </HeaderContainer>
  );
};

export default ProfileHeader;
