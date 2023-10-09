import * as React from 'react';
import { GestureType } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { StyledOverviewItemWrapper } from '../../screens/OverviewScreen/OverviewScreenStyles';
import { selectPortfoliosPerformance } from '../../store/portfolio';
import MarketValueGraph from './MarketValueGraph';
import ReturnGraph from './ReturnGraph';

type Props = {
  marketValuePanRef: React.MutableRefObject<GestureType>;
  returnPanRef: React.MutableRefObject<GestureType>;
};

const Graphs = ({ marketValuePanRef, returnPanRef }: Props) => {
  const portfolioPerformance = useSelector(selectPortfoliosPerformance);
  const priceSeries = portfolioPerformance?.priceSeries;

  return priceSeries ? (
    <>
      <StyledOverviewItemWrapper>
        <MarketValueGraph marketValuePanRef={marketValuePanRef} priceSeries={priceSeries} />
      </StyledOverviewItemWrapper>
      <StyledOverviewItemWrapper>
        <ReturnGraph returnPanRef={returnPanRef} priceSeries={priceSeries} />
      </StyledOverviewItemWrapper>
    </>
  ) : null;
};

export default Graphs;
