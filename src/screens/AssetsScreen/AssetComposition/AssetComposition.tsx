import { InstrumentHoldingSchema } from '@kvika/api-types';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import KvikaText from '../../../components/KvikaText';
import { AssetDrawerText, OverviewScreenText } from '../../../constants/Text';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import { aggregateXHoldings } from '../../../utils/AssetUtils';
import {
  StyledAmount,
  StyledCompositionContainer,
  StyledCompositionRow,
  StyledCompositions,
  StyledCompositionTitle,
  StyledKvikaText,
  StyledSpacer,
} from './AssetCompositionStyles';

type Props = {
  composition: InstrumentHoldingSchema[];
  amount: number;
};

const AssetComposition = ({ composition, amount }: Props) => {
  return (
    <>
      <StyledSpacer color={Colors.gray900} height={1} />
      <StyledCompositionContainer>
        <StyledCompositions>
          <StyledCompositionTitle>
            <KvikaText color={Colors.gold250} fontSize={FontSize.XS} fontWeight={FontWeight.Medium}>
              {AssetDrawerText.AssetComposition}
            </KvikaText>
            <KvikaText color={Colors.gold250} fontSize={FontSize.XS} fontWeight={FontWeight.Medium}>
              {OverviewScreenText.MarketValue}
            </KvikaText>
          </StyledCompositionTitle>
          {aggregateXHoldings(composition, 10).map((instrumentHolding, index) => {
            return (
              <StyledCompositionRow key={instrumentHolding.name + instrumentHolding.symbol} skipMargin={index === 0}>
                <StyledKvikaText numberOfLines={1} fontSize={FontSize.BodySmall} color={Colors.gold150}>
                  {instrumentHolding.name}
                </StyledKvikaText>
                <StyledAmount fontSize={FontSize.BodySmall} color={Colors.gold150}>
                  {getFormattedNumber({ value: instrumentHolding.weight * amount })}
                </StyledAmount>
              </StyledCompositionRow>
            );
          })}
        </StyledCompositions>
      </StyledCompositionContainer>
    </>
  );
};
export default AssetComposition;
