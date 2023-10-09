import * as React from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated from 'react-native-reanimated';
import { useAnalytics } from '@segment/analytics-react-native';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import { HomeScreenText, SummaryScreenText } from '../../constants/Text';
import { SegmentTrackingId, SelectedTab } from '../../types/Types';
import Summary from './Summary/Summary';
import Transactions from './Transactions/Transactions';
import TransactionsTabs from './TransactionsTabs';

const TAB_TITLES = [SummaryScreenText.Summary, HomeScreenText.Transactions];

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const TransactionsScreen = () => {
  const [selectedTab, setSelectedTab] = React.useState<SelectedTab>({
    index: 0,
    tabTitle: TAB_TITLES[0],
  });

  const { track } = useAnalytics();
  const pagerRef = React.useRef<PagerView>(null);

  const handleChangeTab = (index: number) => {
    track(SegmentTrackingId.SelectTransactionsFilter, { filter: TAB_TITLES[index] });
    setSelectedTab({ index, tabTitle: TAB_TITLES[index] });
    pagerRef.current?.setPage(index);
  };

  const tabs = [<Summary key={`${TAB_TITLES[0]}`} />, <Transactions key={`${TAB_TITLES[1]}`} />];

  // TODO: replace for a screen event in navigator
  React.useEffect(() => {
    track(SegmentTrackingId.OpenTransactions);
  }, [track]);

  return (
    <ScreenLayout>
      <TransactionsTabs tabTitles={TAB_TITLES} selectedTab={selectedTab} onTabChange={handleChangeTab} />
      <AnimatedPagerView
        ref={pagerRef}
        initialPage={selectedTab.index}
        style={{ flex: 1 }}
        layoutDirection="ltr"
        overdrag
        onPageSelected={(event) => {
          const { position } = event.nativeEvent;
          if (position !== selectedTab.index) {
            handleChangeTab(position);
          }
        }}
      >
        {tabs.map((tab, index) => (
          <View key={TAB_TITLES[index]}>{tab}</View>
        ))}
      </AnimatedPagerView>
    </ScreenLayout>
  );
};

export default TransactionsScreen;
