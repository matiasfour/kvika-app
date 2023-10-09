import * as React from 'react';
import { Dimensions } from 'react-native';
import { InstrumentSchema } from '@kvika/api-types';
import styled from 'styled-components/native';
import { ApiError } from '@kvika/api-client';
import { useDispatch } from 'react-redux';
import SkeletonContent from 'react-native-skeleton-content';
import { Colors, Grid } from '@kvika/theme';
import { GestureType } from 'react-native-gesture-handler';
import KvikaPillList from '../../KvikaPillList/KvikaPillList';
import { getColorWithOpacity, getInstrumentGraphFilters } from '../../../utils/Utils';
import KvikaApiClient from '../../../api/KvikaApiClient';
import { errorHandling } from '../../../utils/ErrorUtils';
import { InstrumentPeriodPill, Period } from '../../../types/Types';
import { InstrumentGraphData, makeInstrumentGraphData } from '../../../utils/GraphUtils';
import GraphWrapper from './GraphWrapper';
import { getFromDateForPeriod } from '../../../utils/TimeUtils';
import AssetHeading from './AssetHeading';

const PILLS = getInstrumentGraphFilters();

const windowWidth = Dimensions.get('window').width;
const widthWithPadding = windowWidth - 16;

const StyledPillListWrapper = styled.View`
  margin-left: ${Grid['4px']};
  margin-top: ${Grid['4px']};
  margin-bottom: ${Grid['24px']};
`;

type Props = {
  instrument: InstrumentSchema;
  onSetPanRef: (ref: React.MutableRefObject<GestureType | undefined>) => void;
};

type InstrumentGraphCache = {
  [key in Period]?: InstrumentGraphData;
};

const GraphWithButtons = ({ instrument, onSetPanRef }: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState<Period>(Period.THIS_YEAR);
  const [instrumentGraphCache, setInstrumentGraphCache] = React.useState<InstrumentGraphCache>({});
  const [hasErrored, setHasErrored] = React.useState<boolean>(false);

  const fetchGraphData = (fromDate: Date, period: Period) => {
    KvikaApiClient.getApiClient({ dispatch }).then((client) => {
      setIsLoading(true);
      client
        .getInstrumentPriceHistory(instrument.symbol, fromDate.toISOString(), new Date().toISOString())
        .then((history) => {
          setInstrumentGraphCache((prev) => ({ ...prev, [period]: makeInstrumentGraphData(history.priceHistory) }));
          setHasErrored(false);
          setIsLoading(false);
        })
        .catch((error: ApiError) => {
          errorHandling({ error, skipAlert: error.response?.status === 404 });
          setHasErrored(true);
          setIsLoading(false);
        });
    });
  };

  const handleSelectPeriod = (pill: InstrumentPeriodPill) => {
    if (instrumentGraphCache[pill.type] === undefined) {
      fetchGraphData(getFromDateForPeriod(pill.type, new Date()), pill.type);
      setSelectedPeriod(pill.type);
    } else {
      setSelectedPeriod(pill.type);
    }
  };

  // On mount fetch data for the first graph (data set for this year)
  React.useEffect(() => {
    fetchGraphData(getFromDateForPeriod(Period.THIS_YEAR, new Date()), Period.THIS_YEAR);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AssetHeading title={instrument.name} />
      {isLoading ? (
        <SkeletonContent
          isLoading
          containerStyle={{ flex: 1 }}
          layout={[{ key: 2, width: widthWithPadding, height: 274, marginBottom: 8, marginLeft: 8 }]}
          boneColor={getColorWithOpacity(Colors.gold300, 0)}
          highlightColor={getColorWithOpacity(Colors.gold600, 15)}
        />
      ) : (
        <GraphWrapper
          graphData={instrumentGraphCache[selectedPeriod]}
          hasErrored={hasErrored}
          onSetPanRef={onSetPanRef}
        />
      )}
      <StyledPillListWrapper>
        <KvikaPillList
          pills={PILLS}
          onSelectPill={handleSelectPeriod}
          selectedPill={PILLS.find((pill) => pill.type === selectedPeriod)}
        />
      </StyledPillListWrapper>
    </>
  );
};

export default GraphWithButtons;
