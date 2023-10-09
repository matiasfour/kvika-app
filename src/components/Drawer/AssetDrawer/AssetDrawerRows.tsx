import * as React from 'react';
import { PortfolioHoldingSchema } from '@kvika/api-types';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';

import { useSelector } from 'react-redux';
import AssetDrawerRow from './AssetDrawerRow';
import { AssetDrawerText, OverviewScreenText } from '../../../constants/Text';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import { getAmountWithPrefix, getPercentageWithPrefixFromFraction } from '../../../utils/Utils';
import { getFormattedDate } from '../../../utils/TimeUtils';
import { selectPortfoliosPerformance } from '../../../store/portfolio';
import { getSortedPriceSeries } from '../../../utils/AssetUtils';

type Props = {
  asset: PortfolioHoldingSchema;
};

const AssetDrawerRows = ({ asset }: Props) => {
  const portfoliosPerformance = useSelector(selectPortfoliosPerformance);
  const priceSeries = portfoliosPerformance?.priceSeries ?? [];
  const sortedPriceSeries = getSortedPriceSeries(priceSeries);
  const latestDate = sortedPriceSeries[0]?.timestamp ?? new Date().toISOString();
  const marketValue = getFormattedNumber({ value: asset.marketValue });
  const unrealizedGain = getAmountWithPrefix(asset.unrealizedGain);
  const realizedGain = getFormattedNumber({ value: asset.realizedGain });
  const quantity = getFormattedNumber({ value: asset.quantity, showSymbol: false, significantDigits: 2 });
  const instrumentReturn = getPercentageWithPrefixFromFraction(asset.instrumentReturn);
  const contribution = getPercentageWithPrefixFromFraction(asset.contribution);
  const valueWeight = getFormattedNumber({
    value: asset.valueWeight * 100,
    significantDigits: 2,
    symbol: '%',
    showSymbolSpace: false,
  });

  return (
    <>
      <AssetDrawerRow
        fontWeight={FontWeight.Medium}
        fontSize={FontSize.BodySmall}
        titleColor={Colors.gold250}
        title={AssetDrawerText.MyAsset}
        value={getFormattedDate(latestDate, true)}
        color={Colors.gold250}
      />
      <AssetDrawerRow title={OverviewScreenText.MarketValue} value={marketValue} />
      <AssetDrawerRow title={AssetDrawerText.Quantity} value={quantity} />
      <AssetDrawerRow
        title={AssetDrawerText.UnrealisedProfitOrLoss}
        value={unrealizedGain}
        color={asset.unrealizedGain < 0 ? Colors.negativeDark100 : Colors.successDark100}
      />
      <AssetDrawerRow title={AssetDrawerText.RealisedProfitOrLoss} value={realizedGain} />
      <AssetDrawerRow
        title={AssetDrawerText.InstrumentReturn}
        value={instrumentReturn}
        color={asset.instrumentReturn < 0 ? Colors.negativeDark100 : Colors.successDark100}
      />
      <AssetDrawerRow
        title={AssetDrawerText.Contribution}
        value={contribution}
        color={asset.contribution < 0 ? Colors.negativeDark100 : Colors.successDark100}
      />
      <AssetDrawerRow title={AssetDrawerText.ValueWeight} value={valueWeight} />
    </>
  );
};
export default AssetDrawerRows;
