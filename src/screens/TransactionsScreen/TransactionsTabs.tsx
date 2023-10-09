import { Colors } from '@kvika/theme';
import * as React from 'react';
import KvikaText from '../../components/KvikaText';
import { FontWeight } from '../../dls/StyleGuide';
import { SelectedTab } from '../../types/Types';
import { StyledContainer, StyledPressable } from './TransactionsScreenStyles';

type Props = {
  tabTitles: string[];
  selectedTab: SelectedTab;
  onTabChange: (index: number) => void;
};

const TransactionsTabs = ({ tabTitles, selectedTab, onTabChange }: Props) => {
  return (
    <StyledContainer>
      {tabTitles.map((tabTitle, index) => (
        <StyledPressable
          key={tabTitle}
          onPress={() => {
            onTabChange(index);
          }}
          color={index === selectedTab.index ? Colors.gold400 : Colors.goldGray600}
        >
          <KvikaText
            fontSize={16}
            fontWeight={index === selectedTab.index ? FontWeight.Medium : FontWeight.Regular}
            color={index === selectedTab.index ? Colors.gold150 : Colors.goldGray400}
          >
            {tabTitle}
          </KvikaText>
        </StyledPressable>
      ))}
    </StyledContainer>
  );
};

export default TransactionsTabs;
