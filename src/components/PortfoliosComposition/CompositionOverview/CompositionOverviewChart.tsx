import * as React from 'react';

import { processFontFamily } from 'expo-font';
import { VictoryContainer, VictoryLabel, VictoryPie } from 'victory-native';
import { Colors } from '@kvika/theme';
import { getFormattedNumber } from '@kvika/string-utils';

import TotalAssets from '../TotalAssets/TotalAssets';
import { OverviewScreenText } from '../../../constants/Text';
import { FontFamily, FontSize, FontWeight, PORTFOLIO_COMPOSITION_COLORS } from '../../../dls/StyleGuide';
import { StyledCompositionsOverviewContainer, StyledPieChartContainer } from './CompositionOverviewChartStyles';
import { CategoryComposition } from '../../../types/Types';
import { getColorWithOpacity } from '../../../utils/Utils';
import { BASE_ANIMATION_SPEED } from '../../../constants/GeneralConstants';

const PIE_COORDINATES = { x: 50, y: 50 };

type Props = {
  totalAssets: number;
  compositions: CategoryComposition[];
  selectedComposition: CategoryComposition | undefined;
};

const CompositionOverviewChart = ({ totalAssets, compositions, selectedComposition }: Props) => {
  const chartLabelFont = processFontFamily(FontFamily.AkzidenzBold);
  const compositionIndex = compositions.findIndex(
    (composition) => composition.category === selectedComposition?.category
  );
  const colorScale = PORTFOLIO_COMPOSITION_COLORS.map((color, index) => {
    if (selectedComposition) {
      if (index === compositionIndex) {
        return color;
      }
      return getColorWithOpacity(color as Colors, 50);
    }
    return color;
  });

  return (
    <StyledCompositionsOverviewContainer>
      <StyledPieChartContainer>
        <VictoryContainer height={100} width={200}>
          <VictoryPie
            standalone={false}
            colorScale={colorScale}
            innerRadius={45}
            padAngle={2}
            labels={[]} // This is required to hide the unwanted labels
            data={compositions}
            x="category"
            y="percentage"
            origin={PIE_COORDINATES}
            height={200}
            width={200}
            animate={{ duration: BASE_ANIMATION_SPEED }}
          />
          <VictoryLabel
            x={PIE_COORDINATES.x}
            y={PIE_COORDINATES.y}
            textAnchor="middle"
            text={
              selectedComposition
                ? getFormattedNumber({ value: selectedComposition.percentage, symbol: '%', showSymbolSpace: false })
                : '100%'
            }
            style={{
              fill: selectedComposition ? Colors.gold150 : Colors.gray900,
              fontSize: FontSize.BodyLarge,
              fontWeight: FontWeight.Regular,
              ...(chartLabelFont && { fontFamily: chartLabelFont }),
            }}
          />
        </VictoryContainer>
      </StyledPieChartContainer>
      <TotalAssets
        heading={selectedComposition ? selectedComposition.category : OverviewScreenText.TotalAssets}
        amount={selectedComposition ? selectedComposition.value : totalAssets}
      />
    </StyledCompositionsOverviewContainer>
  );
};

export default CompositionOverviewChart;
