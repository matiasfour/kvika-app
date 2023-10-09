import * as React from 'react';

import { ApiError } from '@kvika/api-client';

import { useAnalytics } from '@segment/analytics-react-native';
import { Colors } from '@kvika/theme';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import KvikaApiClient from '../../api/KvikaApiClient';
import KvikaButton from '../../components/KvikaButton/KvikaButton';
import KvikaCheckbox from '../../components/KvikaCheckbox/KvikaCheckbox';
import KvikaLink from '../../components/KvikaLink';
import KvikaLoginHeader from '../../components/KvikaLoginHeader/KvikaLoginHeader';
import KvikaText from '../../components/KvikaText';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import { ErrorStrings, GeneralText, LoginScreenText, TermsAndConditionsScreenText } from '../../constants/Text';
import { TermsAndConditionsScreenProps } from '../../navigation/NavigationTypes';
import { Screen } from '../../navigation/Routes';
import { errorHandling } from '../../utils/ErrorUtils';
import {
  StyledButtonContainer,
  StyledView,
  StyledContainer,
  StyledKvikaCheckboxContainer,
  StyledKvikaButton,
} from './TermsAndConditionsStyles';
import { selectAvailableUserAccounts, updateSelectedUserAccount } from '../../store/userAccount';
import { postSelectedInvesmentUserAndGetPortfolioAccess } from '../../utils/LoginUtils';
import { TERMS_AND_CONDITIONS_URL } from '../../constants/GeneralConstants';
import { SegmentTrackingId } from '../../types/Types';

const TermsAndConditionsScreen = ({ navigation }: TermsAndConditionsScreenProps) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const availableUserAccounts = useSelector(selectAvailableUserAccounts);
  const dispatch = useDispatch();

  const { track } = useAnalytics();

  React.useEffect(() => {
    track(SegmentTrackingId.TermsViewed);
  }, [track]);

  const onForward = () => {
    setIsLoading(true);
    KvikaApiClient.getApiClient({ dispatch }).then((client) => {
      client
        .postUsersTerms()
        .then(() => {
          track(SegmentTrackingId.TermsViewed);
          if (availableUserAccounts.length > 1) {
            navigation.replace(Screen.UserScreen);
          } else if (availableUserAccounts.length === 1) {
            dispatch(updateSelectedUserAccount(availableUserAccounts[0]));
            postSelectedInvesmentUserAndGetPortfolioAccess({
              investmentUserId: availableUserAccounts[0].investmentUserId,
              dispatch,
              navigation,
            });
          } else {
            Alert.alert(ErrorStrings.ErrorHeadline, LoginScreenText.UserNotFound);
          }
        })
        .catch((error: ApiError) => {
          track(SegmentTrackingId.RegistrationFailed);
          errorHandling({ error });
          setIsLoading(false);
        });
    });
  };

  return (
    <ScreenLayout backgroundColor={Colors.black5}>
      <StyledContainer>
        <KvikaLoginHeader
          title={TermsAndConditionsScreenText.Terms}
          description={TermsAndConditionsScreenText.AcceptTerms}
          logo={require('../../../assets/images/icon_transparent_bg.png')}
        />
        <StyledView />
        <StyledKvikaCheckboxContainer>
          <KvikaCheckbox isChecked={isChecked} onPress={() => setIsChecked(!isChecked)}>
            <KvikaText>{`${TermsAndConditionsScreenText.Approve} `}</KvikaText>
            <KvikaLink href={TERMS_AND_CONDITIONS_URL}>
              <KvikaText style={{ textDecorationLine: 'underline' }}>
                {TermsAndConditionsScreenText.KvikaTerms}
              </KvikaText>
            </KvikaLink>
          </KvikaCheckbox>
        </StyledKvikaCheckboxContainer>

        <StyledButtonContainer>
          {/* TODO: Log user out if they select cancel */}
          <StyledKvikaButton
            onPress={() => navigation.replace(Screen.LoginScreen, { hasAuthToken: false })}
            title={GeneralText.Cancel}
            light
          />
          <KvikaButton onPress={onForward} title={GeneralText.Forward} disabled={!isChecked} isLoading={isLoading} />
        </StyledButtonContainer>
      </StyledContainer>
    </ScreenLayout>
  );
};

export default TermsAndConditionsScreen;
