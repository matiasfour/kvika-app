import { DetailedInstrumentSchema } from '@kvika/api-types';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import React from 'react';
import { Pressable } from 'react-native';
import GradientText from '../../../components/GradientText/GradientText';
import KvikaText from '../../../components/KvikaText';
import { FontSize } from '../../../dls/StyleGuide';
import AssetComposition from '../AssetComposition/AssetComposition';
import { StyledAmount, StyledContainer, StyledFundRow, StyledKvikaText, StyledPill } from './AssetRowStyles';

type Props = {
  percentage: string;
  amount: number;
  isLoss: boolean;
  onPress?: () => void;
  instrument: DetailedInstrumentSchema;
};

const AssetRow = ({ percentage, amount, isLoss, onPress, instrument }: Props) => {
  const showComposition = instrument.showComposition && instrument.holdings.length > 0;
  return (
    <StyledContainer>
      <Pressable onPress={onPress}>
        <StyledFundRow>
          <GradientText text={instrument.name} width="65%" />
          <StyledAmount>{getFormattedNumber({ value: amount })}</StyledAmount>
        </StyledFundRow>
        <StyledFundRow isLastRow>
          <StyledKvikaText color={Colors.gold250} fontSize={FontSize.BodyRegular}>
            {instrument.symbol}
          </StyledKvikaText>
          <StyledPill isLoss={isLoss}>
            <KvikaText color={isLoss ? Colors.negativeDark100 : Colors.successDark100} fontSize={FontSize.BodyRegular}>
              {percentage}
            </KvikaText>
          </StyledPill>
        </StyledFundRow>
      </Pressable>
      {showComposition && <AssetComposition amount={amount} composition={instrument.holdings} />}
    </StyledContainer>
  );
};

export default AssetRow;
