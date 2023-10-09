import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Colors } from '@kvika/theme';
import KvikaLoginHeader from '../../components/KvikaLoginHeader/KvikaLoginHeader';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import { GeneralText, SelectPortfoliosScreenText } from '../../constants/Text';
import { SelectPortfoliosScreenProps } from '../../navigation/NavigationTypes';
import {
  StyledButtonContainer,
  StyledContainer,
  StyledErrorContainer,
  StyledKvikaButton,
} from './SelectPortfoliosScreenStyles';
import { promptUserForBiometricPreference } from '../../utils/Biometrics/BiometricsUtils';
import { Screen } from '../../navigation/Routes';
import { selectPortfolioAccess } from '../../store/portfolio';
import KvikaText from '../../components/KvikaText';
import PortfolioPicker from '../../components/PortfolioPicker/PortfolioPicker';
import { updatePortfolioIds } from '../../store/ppid';
import { selectAvailableUserAccounts } from '../../store/userAccount';

const SelectPortfoliosScreen = ({ navigation }: SelectPortfoliosScreenProps) => {
  const portfolioAccess = useSelector(selectPortfolioAccess);
  const availableUserAccounts = useSelector(selectAvailableUserAccounts);

  const dispatch = useDispatch();

  const [selectedPortfolioIds, setSelectedPortfolioIds] = React.useState<number[]>(
    portfolioAccess.map((p) => p.portfolioId)
  );

  const handlePress = () => {
    dispatch(updatePortfolioIds(selectedPortfolioIds));
    navigation.replace(Screen.HomeScreenWrapper);
    promptUserForBiometricPreference();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenLayout backgroundColor={Colors.black5}>
      <StyledContainer>
        <KvikaLoginHeader
          title={SelectPortfoliosScreenText.Portfolios}
          description={SelectPortfoliosScreenText.ChoosePortfoliosForApp}
          logo={require('../../../assets/images/icon_transparent_bg.png')}
        />
        {portfolioAccess.length < 1 ? (
          <StyledErrorContainer>
            <KvikaText color={Colors.goldGray400}>{SelectPortfoliosScreenText.NoPortfoliosFound}</KvikaText>
          </StyledErrorContainer>
        ) : (
          <PortfolioPicker
            selectedPortfolioIds={selectedPortfolioIds}
            setSelectedPortfolioIds={setSelectedPortfolioIds}
          />
        )}
        <StyledButtonContainer>
          {availableUserAccounts.length > 1 && (
            <StyledKvikaButton light title={GeneralText.Back} onPress={handleBackPress} />
          )}

          <StyledKvikaButton
            title={GeneralText.Forward}
            onPress={handlePress}
            disabled={selectedPortfolioIds.length < 1}
          />
        </StyledButtonContainer>
      </StyledContainer>
    </ScreenLayout>
  );
};

export default SelectPortfoliosScreen;
