import { PortfolioHoldingSchema } from '@kvika/api-types';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import { AssetDrawerText } from '../../../constants/Text';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import { aggregateXHoldings } from '../../../utils/AssetUtils';
import { getFormattedDate } from '../../../utils/TimeUtils';
import AssetDrawerRow from './AssetDrawerRow';
import { StyledAssetCompositionContainer } from './AssetDrawerRowStyles';

type Props = {
  asset: PortfolioHoldingSchema;
};

const AssetComposition = ({ asset }: Props) => {
  const { marketValue } = asset;
  const { holdings } = asset.instrument;

  const aggregatedHoldings = aggregateXHoldings(holdings, 10);
  const DEFAULT_POSITION_DATE = '01-01-2000';
  const positionDate =
    holdings.length > 0
      ? getFormattedDate(holdings[0].positionDate, true)
      : getFormattedDate(DEFAULT_POSITION_DATE, true);

  return (
    <StyledAssetCompositionContainer>
      <AssetDrawerRow
        fontWeight={FontWeight.Medium}
        fontSize={FontSize.BodySmall}
        titleColor={Colors.gold250}
        title={AssetDrawerText.AssetComposition}
        value={positionDate}
        color={Colors.gold250}
      />
      {aggregatedHoldings.map((holding) => {
        const value = getFormattedNumber({
          value: marketValue * holding.weight,
        });

        return <AssetDrawerRow key={holding.name} title={holding.name} value={value} />;
      })}
    </StyledAssetCompositionContainer>
  );
};

export default AssetComposition;
