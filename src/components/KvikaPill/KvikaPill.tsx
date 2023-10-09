import { Colors } from '@kvika/theme';
import * as React from 'react';
import { FontSize, FontWeight } from '../../dls/StyleGuide';
import { Pill } from '../../types/Types';
import KvikaText from '../KvikaText';
import { StyledPill } from './KvikaPillStyles';

type Props<T extends Pill> = {
  pill: T;
  onSelectPill?: (selectedPill: T) => void;
  backgroundColor: Colors;
  fontWeight?: FontWeight;
  fontColor?: Colors;
  small?: boolean;
};

const KvikaPill = <T extends Pill>({ pill, onSelectPill, backgroundColor, fontColor, fontWeight, small }: Props<T>) => {
  return (
    <StyledPill
      onPress={() => {
        onSelectPill && onSelectPill(pill);
      }}
      backgroundColor={backgroundColor}
      small={small}
    >
      <KvikaText fontWeight={fontWeight} color={fontColor} fontSize={FontSize.BodyRegular}>
        {pill.text}
      </KvikaText>
    </StyledPill>
  );
};
export default KvikaPill;
