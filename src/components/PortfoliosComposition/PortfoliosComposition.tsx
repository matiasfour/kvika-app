import { PortfolioCompositionPerformanceSchema } from '@kvika/api-types';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import { OverviewScreenText } from '../../constants/Text';
import { FontSize, FontWeight } from '../../dls/StyleGuide';
import { CategoryComposition } from '../../types/Types';
import { getCompositionByCategory, getTotalAssets } from '../../utils/AssetUtils';
import CompositionOverviewChart from './CompositionOverview/CompositionOverviewChart';
import CompositionSummary from './CompositionSummary';
import { StyledContainer, StyledTitle } from './PortfoliosCompositionStyles';

type Props = {
  portfoliosPerformance: PortfolioCompositionPerformanceSchema;
};

const PortfoliosComposition = ({ portfoliosPerformance }: Props) => {
  const [selectedComposition, setSelectedComposition] = React.useState<CategoryComposition>();

  const calculateTotalAssets = React.useCallback(() => {
    return getTotalAssets(portfoliosPerformance);
  }, [portfoliosPerformance]);

  const totalAssets = calculateTotalAssets();

  const getCompositions = React.useCallback(() => {
    return getCompositionByCategory(portfoliosPerformance, totalAssets).sort((A, B) => B.percentage - A.percentage);
  }, [portfoliosPerformance, totalAssets]);

  const compositions = getCompositions();
  return (
    <StyledContainer>
      <StyledTitle fontWeight={FontWeight.Medium} fontSize={FontSize.BodySmall} color={Colors.gold400}>
        {OverviewScreenText.Composition}
      </StyledTitle>
      <CompositionOverviewChart
        totalAssets={totalAssets}
        compositions={compositions}
        selectedComposition={selectedComposition}
      />
      <CompositionSummary
        compositions={compositions}
        selectedComposition={selectedComposition}
        onCompositionPress={setSelectedComposition}
      />
    </StyledContainer>
  );
};

export default PortfoliosComposition;
