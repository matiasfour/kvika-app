import * as React from 'react';
import { SelectPortfoliosScreenText } from '../../../../constants/Text';
import PortfolioPicker from '../../../PortfolioPicker/PortfolioPicker';
import ProfilePageHeader from '../ProfilePageHeader/ProfilePageHeader';
import { PortfolioContainer } from './SelectPortfolioPageStyles';

type Props = {
  onBackPress: () => void;
  selectedPortfolioIds: number[];
  setSelectedPortfolioIds: (holdings: number[]) => void;
};

const SelectPortfolioPage = ({ onBackPress, selectedPortfolioIds, setSelectedPortfolioIds }: Props) => {
  return (
    <PortfolioContainer>
      <ProfilePageHeader
        onBackPress={onBackPress}
        title={SelectPortfoliosScreenText.ChoosePortfolios}
        description={SelectPortfoliosScreenText.ChoosePortfoliosForApp}
      />
      <PortfolioPicker selectedPortfolioIds={selectedPortfolioIds} setSelectedPortfolioIds={setSelectedPortfolioIds} />
    </PortfolioContainer>
  );
};

export default SelectPortfolioPage;
