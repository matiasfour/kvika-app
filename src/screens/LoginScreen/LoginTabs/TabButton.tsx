import { Colors } from '@kvika/theme';
import * as React from 'react';
import KvikaText from '../../../components/KvikaText';
import { FontWeight } from '../../../dls/StyleGuide';
import { StyledPressable } from './LoginTabsStyles';

type Props = {
  title: string;
  onPress(): void;
  isSelected: boolean;
};

const TabButton = ({ title, onPress, isSelected }: Props) => {
  return (
    <StyledPressable onPress={onPress} isSelected={isSelected}>
      <KvikaText
        fontWeight={isSelected ? FontWeight.Medium : FontWeight.Regular}
        color={isSelected ? Colors.gold250 : Colors.goldGray400}
      >
        {title}
      </KvikaText>
    </StyledPressable>
  );
};
export default TabButton;
