import { Colors } from '@kvika/theme';
import * as React from 'react';
import { PORTFOLIO_COMPOSITION_COLORS } from '../../dls/StyleGuide';
import { CategoryComposition } from '../../types/Types';
import CompositionSummaryRow from './CompositionSummaryRow';
import { StyledHoldingsContainer } from './PortfoliosCompositionStyles';

type Props = {
  compositions: CategoryComposition[];
  selectedComposition: CategoryComposition | undefined;
  onCompositionPress: (portfolio: CategoryComposition | undefined) => void;
};

const CompositionSummary = ({ compositions, selectedComposition, onCompositionPress }: Props) => {
  const filteredCompositions = compositions.filter((composition) => composition.value !== 0);

  return (
    <StyledHoldingsContainer>
      {filteredCompositions &&
        filteredCompositions.map((composition, index) => {
          const name = composition.category;
          const isSelected = composition.category === selectedComposition?.category;
          return (
            <CompositionSummaryRow
              key={name}
              composition={composition}
              isSelected={isSelected}
              onCompositionPress={onCompositionPress}
              color={PORTFOLIO_COMPOSITION_COLORS[index] ?? Colors.negativeDark100}
            />
          );
        })}
    </StyledHoldingsContainer>
  );
};

export default CompositionSummary;
