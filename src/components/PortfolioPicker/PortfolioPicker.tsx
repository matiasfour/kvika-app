import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '@kvika/theme';
import { selectPortfolioAccess } from '../../store/portfolio';
import { StyledContentContainer, StyledHeaderView, StyledView } from './PortfolioPickerStyles';
import KvikaCheckbox from '../KvikaCheckbox/KvikaCheckbox';
import { isEveryPortfolioSelected, onChangePortfolio, selectEveryPortfolio } from '../../utils/PortfolioUtils';
import KvikaText from '../KvikaText';
import { SelectPortfoliosScreenText } from '../../constants/Text';
import { getGroupedPortfolioAccess, getSortedPortfolioAccessGroupHeaders } from '../../utils/Utils';
import Portfolio from './Portfolio';
import { FontWeight } from '../../dls/StyleGuide';

type Props = {
  selectedPortfolioIds: number[];
  setSelectedPortfolioIds: (holdings: number[]) => void;
  hasMarginLeft?: boolean;
};

const PortfolioPicker = ({ selectedPortfolioIds, setSelectedPortfolioIds, hasMarginLeft }: Props) => {
  const portfolioAccess = useSelector(selectPortfolioAccess);
  const groupedPortfolioAccess = getGroupedPortfolioAccess(portfolioAccess);
  const headers = getSortedPortfolioAccessGroupHeaders(groupedPortfolioAccess);

  return (
    <StyledView hasMarginLeft={hasMarginLeft}>
      <KvikaCheckbox
        isChecked={isEveryPortfolioSelected(portfolioAccess, selectedPortfolioIds)}
        onPress={() => selectEveryPortfolio(portfolioAccess, selectedPortfolioIds, setSelectedPortfolioIds)}
      >
        <KvikaText>{SelectPortfoliosScreenText.ShowAllPortfolios}</KvikaText>
      </KvikaCheckbox>
      <StyledContentContainer>
        {headers.map((header) => {
          return (
            <View key={header}>
              <StyledHeaderView>
                <KvikaText fontWeight={FontWeight.Medium} color={Colors.gold150}>
                  {header}
                </KvikaText>
              </StyledHeaderView>
              {groupedPortfolioAccess[header].map((portfolio) => {
                return (
                  <Portfolio
                    key={portfolio.portfolioId + portfolio.portfolioName}
                    title={portfolio.portfolioName}
                    onPress={() =>
                      onChangePortfolio(portfolio.portfolioId, selectedPortfolioIds, setSelectedPortfolioIds)
                    }
                    isChecked={selectedPortfolioIds.some(
                      (selectedPortfolioId) => selectedPortfolioId === portfolio.portfolioId
                    )}
                  />
                );
              })}
            </View>
          );
        })}
      </StyledContentContainer>
    </StyledView>
  );
};

export default PortfolioPicker;
