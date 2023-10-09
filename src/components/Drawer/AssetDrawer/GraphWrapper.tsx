import * as React from 'react';
import { GestureType } from 'react-native-gesture-handler';
import { AssetDrawerText } from '../../../constants/Text';
import { InstrumentGraphData } from '../../../utils/GraphUtils';
import { InstrumentGraph } from '../../Graphs/InstrumentGraph/InstrumentGraph';
import { StyledNoDataContainer, StyledNoDataContent, StyledNoDataDescription } from './GraphWrapperStyles';

type Props = {
  graphData: InstrumentGraphData | undefined;
  hasErrored: boolean;
  onSetPanRef: (ref: React.MutableRefObject<GestureType | undefined>) => void;
};

const GraphWrapper = ({ graphData, hasErrored, onSetPanRef }: Props) => {
  if (graphData) {
    return <InstrumentGraph graphData={graphData} onSetPanRef={onSetPanRef} />;
  }
  return (
    <StyledNoDataContainer>
      <StyledNoDataContent>
        {hasErrored && <StyledNoDataDescription>{AssetDrawerText.CouldNotGetDataForGraph}</StyledNoDataDescription>}
      </StyledNoDataContent>
    </StyledNoDataContainer>
  );
};

export default GraphWrapper;
