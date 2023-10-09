import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PortfolioHoldingSchema } from '@kvika/api-types';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import { Animated, RefreshControl, View } from 'react-native';
import { FlatList, GestureType } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux';
import { useAnalytics } from '@segment/analytics-react-native';
import AssetBottomDrawer from '../../components/Drawer/AssetDrawer/AssetBottomDrawer';
import AssetDrawer from '../../components/Drawer/AssetDrawer/AssetDrawer';
import NoDataContainer from '../../components/NoDataContainer';
import KvikaPillList from '../../components/KvikaPillList/KvikaPillList';
import KvikaText from '../../components/KvikaText';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import { AssetScreenText } from '../../constants/Text';
import { selectIsLoadingPortfoliosPerformance, selectPortfoliosPerformance } from '../../store/portfolio';
import { AssetPill, Drawer, SegmentTrackingId } from '../../types/Types';
import {
  compareMarketValue,
  GENERAL_FILTERS,
  getAllCategories,
  getFilteredHoldings,
  getTotalAssetValue,
  getTotalAssetValueText,
} from '../../utils/AssetUtils';
import { getFlatListOffset, getPercentageWithPrefixFromFraction } from '../../utils/Utils';
import AssetRow from './AssetRow/AssetRow';
import { StyledLayout, StyledTotalValue } from './AssetScreenStyles';
import { selectPeriod, selectPortfolioIds } from '../../store/ppid';
import { handleGetPortfoliosPerformance } from '../../utils/ApiClientUtils';
import { AssetsSkeleton } from '../../components/Skeletons/AssetsSkeleton';
import GradientText from '../../components/GradientText/GradientText';
import KvikaSpacer from '../../components/KvikaSpacer/KvikaSpacer';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const AssetsScreen = () => {
  // We need this as a state variable to update it when the instrument graph mounts
  // The ref itself is created in the InstrumentGraph component
  const [instrumentGraphPanRef, setInstrumentGraphPanRef] = React.useState<
    React.MutableRefObject<GestureType | undefined> | undefined
  >();
  const [selectedFilter, setSelectedFilter] = React.useState<AssetPill>(GENERAL_FILTERS[0]); // Initialize filter with the "All assets" filter
  const [selectedAsset, setSelectedAsset] = React.useState<PortfolioHoldingSchema>();
  const assetDrawerRef = React.useRef<BottomSheetModal>(null);
  const portfolioCompositionPerformance = useSelector(selectPortfoliosPerformance);
  const filters = getAllCategories(portfolioCompositionPerformance);
  const totalAssetValue = getTotalAssetValue(selectedFilter.type, portfolioCompositionPerformance);
  const hasData = portfolioCompositionPerformance && portfolioCompositionPerformance.holdings.length > 0;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const pagerRef = React.useRef<PagerView>(null);
  const flatListRef = React.useRef<FlatList<AssetPill>>(null);

  const period = useSelector(selectPeriod);
  const portfolioIds = useSelector(selectPortfolioIds);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const isLoading = useSelector(selectIsLoadingPortfoliosPerformance);
  const showSkeleton = isLoading || isRefreshing;

  const { track } = useAnalytics();

  const handleChangeTab = React.useCallback(
    (pill: AssetPill) => {
      setSelectedFilter(pill);
      track(SegmentTrackingId.SelectAssetsFilter, { filter: pill });
      const assetIndex = filters.findIndex((filter) => filter.text === pill.text);
      const normalizedIndex = assetIndex < 0 ? 0 : assetIndex;
      if (normalizedIndex !== currentIndex) {
        setCurrentIndex(normalizedIndex);
        pagerRef.current?.setPage(normalizedIndex);
        flatListRef.current?.scrollToOffset({
          offset: getFlatListOffset(normalizedIndex, filters),
          animated: true,
        });
      }
    },
    [currentIndex, filters, track]
  );

  const handleAssetPress = React.useCallback(
    (holding: PortfolioHoldingSchema) => {
      track(SegmentTrackingId.ViewAssetDetails, { asset: holding.instrument.name });
      if (assetDrawerRef.current) {
        assetDrawerRef.current.present();
      }
    },
    [track]
  );

  const refreshData = React.useCallback(() => {
    setIsRefreshing(true);
    handleGetPortfoliosPerformance(dispatch, period, portfolioIds, () => {
      setIsRefreshing(false);
    });
  }, [dispatch, period, portfolioIds]);

  // TODO: replace for a screen event in navigator
  React.useEffect(() => {
    track(SegmentTrackingId.OpenAssets);
  }, [track]);

  if (showSkeleton) {
    return (
      <ScreenLayout>
        <AssetsSkeleton isLoading />
      </ScreenLayout>
    );
  }
  if (!hasData) {
    return (
      <ScreenLayout>
        <StyledLayout
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshData}
              tintColor={Colors.gold200}
              colors={[Colors.gold200]}
            />
          }
        >
          <KvikaSpacer height={4} opacity={0} />
          <NoDataContainer errorMsg={AssetScreenText.NoAssetsFound} />
        </StyledLayout>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <>
        <KvikaPillList
          flatListRef={flatListRef}
          pills={filters}
          onSelectPill={handleChangeTab}
          selectedPill={selectedFilter}
        />
        <AnimatedPagerView ref={pagerRef} style={{ flex: 1 }} layoutDirection="ltr" overdrag>
          {filters.map((filter) => {
            const holdings = getFilteredHoldings(filter.type, portfolioCompositionPerformance).sort(compareMarketValue);
            return (
              <View key={filter.text} style={{ flex: 1 }}>
                <StyledLayout
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={refreshData}
                      tintColor={Colors.gold200}
                      colors={[Colors.gold200]}
                    />
                  }
                >
                  {holdings.map((holding) => {
                    return (
                      <AssetRow
                        key={`${holding.instrument.id + holding.marketValue}`}
                        percentage={getPercentageWithPrefixFromFraction(holding.instrumentReturn)}
                        amount={holding.marketValue}
                        isLoss={holding.instrumentReturn < 0}
                        instrument={holding.instrument}
                        onPress={() => {
                          setSelectedAsset(holding);
                          handleAssetPress(holding);
                        }}
                      />
                    );
                  })}
                </StyledLayout>
              </View>
            );
          })}
        </AnimatedPagerView>
        <StyledTotalValue>
          <GradientText color={Colors.goldGray400} text={getTotalAssetValueText(selectedFilter.text)} width="60%" />
          {totalAssetValue !== undefined && (
            <KvikaText color={Colors.goldGray400}>{getFormattedNumber({ value: totalAssetValue })}</KvikaText>
          )}
        </StyledTotalValue>
        <AssetBottomDrawer ref={assetDrawerRef} name={Drawer.ASSET} graphPanRef={instrumentGraphPanRef}>
          {selectedAsset && <AssetDrawer asset={selectedAsset} onSetPanRef={setInstrumentGraphPanRef} />}
        </AssetBottomDrawer>
      </>
    </ScreenLayout>
  );
};

export default AssetsScreen;
