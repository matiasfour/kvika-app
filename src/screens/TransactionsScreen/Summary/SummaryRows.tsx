import { PortfolioCompositionPerformanceSchema } from '@kvika/api-types';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import { View } from 'react-native';
import KvikaSpacer from '../../../components/KvikaSpacer/KvikaSpacer';
import KvikaText from '../../../components/KvikaText';
import { SummaryScreenText } from '../../../constants/Text';
import { FontWeight } from '../../../dls/StyleGuide';
import { getValueColor } from '../../../utils/Utils';
import { SummaryRow, SummaryContainer, StyledSummaryTitle } from './SummaryStyles';

type Props = {
  portfoliosPerformance: PortfolioCompositionPerformanceSchema;
};

const SummaryRows = ({ portfoliosPerformance }: Props) => {
  return (
    <View>
      <SummaryRow hasPaddingTop>
        <StyledSummaryTitle fontWeight={FontWeight.Medium}>{SummaryScreenText.StartMarketValue}</StyledSummaryTitle>
        <KvikaText fontWeight={FontWeight.Medium}>
          {getFormattedNumber({ value: portfoliosPerformance.marketValueStartOfPeriod })}
        </KvikaText>
      </SummaryRow>
      <KvikaSpacer height={1} color={Colors.gray800} />
      <SummaryContainer>
        <SummaryRow hasPaddingTop>
          <StyledSummaryTitle>{SummaryScreenText.Inflow}</StyledSummaryTitle>
          <KvikaText>{getFormattedNumber({ value: portfoliosPerformance.inflow })}</KvikaText>
        </SummaryRow>
        <SummaryRow>
          <StyledSummaryTitle>{SummaryScreenText.Outflow}</StyledSummaryTitle>
          <KvikaText>{getFormattedNumber({ value: -portfoliosPerformance.outflow })}</KvikaText>
        </SummaryRow>
        <SummaryRow>
          <StyledSummaryTitle color={getValueColor(Math.round(portfoliosPerformance.realizedGain))}>
            {SummaryScreenText.RealisedProfit}
          </StyledSummaryTitle>
          <KvikaText color={getValueColor(Math.round(portfoliosPerformance.realizedGain))}>
            {getFormattedNumber({ value: portfoliosPerformance.realizedGain })}
          </KvikaText>
        </SummaryRow>
        <SummaryRow>
          <StyledSummaryTitle color={getValueColor(Math.round(portfoliosPerformance.unrealizedGain))}>
            {SummaryScreenText.UnrealisedProfit}
          </StyledSummaryTitle>
          <KvikaText color={getValueColor(Math.round(portfoliosPerformance.unrealizedGain))}>
            {getFormattedNumber({ value: portfoliosPerformance.unrealizedGain })}
          </KvikaText>
        </SummaryRow>
        <SummaryRow>
          <StyledSummaryTitle>{SummaryScreenText.CapitalYieldTax}</StyledSummaryTitle>
          <KvikaText>{getFormattedNumber({ value: -portfoliosPerformance.tax })}</KvikaText>
        </SummaryRow>
      </SummaryContainer>
      <KvikaSpacer height={1} color={Colors.gray800} />
      <SummaryRow hasPaddingTop>
        <StyledSummaryTitle fontWeight={FontWeight.Medium}>{SummaryScreenText.EndMarketValue}</StyledSummaryTitle>
        <KvikaText fontWeight={FontWeight.Medium}>
          {getFormattedNumber({ value: portfoliosPerformance.marketValue })}
        </KvikaText>
      </SummaryRow>
      <SummaryRow>
        <StyledSummaryTitle color={getValueColor(portfoliosPerformance.totalReturn)}>
          {SummaryScreenText.PortfolioYield}
        </StyledSummaryTitle>
        <KvikaText color={getValueColor(portfoliosPerformance.totalReturn)}>
          {getFormattedNumber({
            value: portfoliosPerformance.totalReturn * 100,
            significantDigits: 2,
            symbol: '%',
          })}
        </KvikaText>
      </SummaryRow>
    </View>
  );
};

export default SummaryRows;
