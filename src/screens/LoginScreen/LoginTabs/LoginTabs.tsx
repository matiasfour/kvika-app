import * as React from 'react';
import { SelectedTab } from '../../../types/Types';
import { StyledLoginTabsContainer } from './LoginTabsStyles';
import TabButton from './TabButton';

type Props = {
  tabTitles: string[];
  selectedTab: SelectedTab;
  onTabChange: (index: number) => void;
};

const LoginTabs = ({ selectedTab, onTabChange, tabTitles }: Props) => {
  return (
    <StyledLoginTabsContainer>
      {tabTitles.map((tabTitle, index) => {
        return (
          <TabButton
            key={tabTitle}
            onPress={() => {
              onTabChange(index);
            }}
            title={tabTitles[index]}
            isSelected={index === selectedTab.index}
          />
        );
      })}
    </StyledLoginTabsContainer>
  );
};
export default LoginTabs;
