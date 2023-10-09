import { Colors } from '@kvika/theme';
import * as React from 'react';
import { TERMS_AND_CONDITIONS_URL } from '../../../../constants/GeneralConstants';
import { ProfileDrawerText } from '../../../../constants/Text';
import { FontWeight } from '../../../../dls/StyleGuide';
import KvikaLink from '../../../KvikaLink';
import KvikaText from '../../../KvikaText';
import { RowContainer } from './ProfileInfoPageStyles';

const TermsRow = () => {
  return (
    <RowContainer>
      <KvikaLink href={TERMS_AND_CONDITIONS_URL}>
        <KvikaText color={Colors.gold150} fontWeight={FontWeight.Medium}>
          {ProfileDrawerText.TermsAndConditions}
        </KvikaText>
      </KvikaLink>
    </RowContainer>
  );
};
export default TermsRow;
