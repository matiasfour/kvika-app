import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RefreshControl, StyleSheet } from 'react-native';
import { Gesture, GestureType } from 'react-native-gesture-handler';
import { Colors } from '@kvika/theme';

import { useAnalytics } from '@segment/analytics-react-native';
import { StyledOverviewItemWrapper, StyledGHScrollView, StyledNoDataContainerWrapper } from './OverviewScreenStyles';
import PortfoliosComposition from '../../components/PortfoliosComposition/PortfoliosComposition';
import { isDebuggingEnabled } from '../../env/Environment';
import { selectPeriod, selectPortfolioIds } from '../../store/ppid';
import { selectIsLoadingPortfoliosPerformance, selectPortfoliosPerformance } from '../../store/portfolio';
import { GraphSkeleton } from '../../components/Skeletons/GraphSkeleton';
import { AssetCompositionSkeleton } from '../../components/Skeletons/AssetCompositionSkeleton';
import { handleGetPortfoliosPerformance } from '../../utils/ApiClientUtils';
import NoDataContainer from '../../components/NoDataContainer';
import { AssetScreenText } from '../../constants/Text';
import Graphs from '../../components/Graphs/Graphs';
import { SegmentTrackingId } from '../../types/Types';

const GraphSkeletonWrapper = () => {
  return (
    <>
      <StyledOverviewItemWrapper>
        <GraphSkeleton isLoading />
      </StyledOverviewItemWrapper>
      <StyledOverviewItemWrapper>
        <GraphSkeleton isLoading showPercentage />
      </StyledOverviewItemWrapper>
    </>
  );
};

const OverviewScreen = () => {
  const marketValueGraphPanRef = React.useRef<GestureType>(Gesture.Pan());
  const returnGraphPanRef = React.useRef<GestureType>(Gesture.Pan());
  const portfoliosPerformance = useSelector(selectPortfoliosPerformance);
  const isLoading = useSelector(selectIsLoadingPortfoliosPerformance);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const period = useSelector(selectPeriod);
  const portfolioIds = useSelector(selectPortfolioIds);
  const dispatch = useDispatch();
  const { track } = useAnalytics();
  const hasData = portfoliosPerformance && portfoliosPerformance.holdings.length > 0;
  const refreshData = React.useCallback(() => {
    setIsRefreshing(true);
    handleGetPortfoliosPerformance(dispatch, period, portfolioIds, () => {
      setIsRefreshing(false);
    });
  }, [dispatch, period, portfolioIds]);

  // TODO: replace for a screen event in navigator
  React.useEffect(() => {
    track(SegmentTrackingId.OpenOverview);
  }, [track]);

  const renderGraphs = React.useCallback(() => {
    if (isLoading || isDebuggingEnabled()) {
      return <GraphSkeletonWrapper />;
    }
    // TODO: We had issues with the refs when using Suspense here as it broke scrolling while touching graphs.
    // For now, comment out this line to be able to use rn-debugger.
    return <Graphs marketValuePanRef={marketValueGraphPanRef} returnPanRef={returnGraphPanRef} />;
  }, [isLoading, marketValueGraphPanRef, returnGraphPanRef]);

  const renderAssetComposition = React.useCallback(() => {
    if (isLoading) {
      return (
        <StyledOverviewItemWrapper>
          <AssetCompositionSkeleton isLoading />
        </StyledOverviewItemWrapper>
      );
    }
    if (hasData && portfoliosPerformance.marketValue) {
      return (
        <StyledOverviewItemWrapper>
          <PortfoliosComposition portfoliosPerformance={portfoliosPerformance} />
        </StyledOverviewItemWrapper>
      );
    }
    return null;
  }, [hasData, isLoading, portfoliosPerformance]);

  const renderContent = React.useCallback(() => {
    if (!hasData && !isLoading) {
      return (
        <StyledNoDataContainerWrapper>
          <NoDataContainer errorMsg={AssetScreenText.NoAssetsFound} />
        </StyledNoDataContainerWrapper>
      );
    }
    return (
      <>
        {renderGraphs()}
        {renderAssetComposition()}
      </>
    );
  }, [hasData, isLoading, renderAssetComposition, renderGraphs]);

  return (
    <StyledGHScrollView
      contentContainerStyle={styles.contentContainerStyle}
      simultaneousHandlers={[marketValueGraphPanRef, returnGraphPanRef]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        // NOTE: Don't move this into own component, that crashes in Android.
        // It's a known issue with ScrollView from react-native-gesture-handler.
        // See: https://github.com/software-mansion/react-native-gesture-handler/issues/1067
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshData}
          tintColor={Colors.gold200}
          colors={[Colors.gold200]}
        />
      }
    >
      {renderContent()}
    </StyledGHScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default OverviewScreen;
