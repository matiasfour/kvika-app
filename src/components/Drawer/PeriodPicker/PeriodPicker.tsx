import * as React from 'react';
import { FontSize } from '../../../dls/StyleGuide';
import { StyledContainer, StyledKvikaButton, StyledPickerRow } from './PeriodPickerStyles';
import { InstrumentPeriodPill, Period } from '../../../types/Types';
import { PERIODS } from '../../../constants/PeriodConstants';

type Props = {
  onPress: (period: Period) => void;
  selectedPeriod?: Period;
};

const PeriodPicker = ({ onPress, selectedPeriod }: Props) => {
  const renderContent = (row: InstrumentPeriodPill[]) => {
    return row.map((period) => {
      return (
        <StyledKvikaButton
          key={period.type}
          title={period.text}
          onPress={() => onPress(period.type)}
          selected={selectedPeriod === period.type}
          fontSize={FontSize.BodySmall}
        />
      );
    });
  };

  return (
    <StyledContainer>
      <StyledPickerRow>{renderContent(PERIODS)}</StyledPickerRow>
    </StyledContainer>
  );
};

export default PeriodPicker;
