import * as React from 'react';

import { PortfolioHoldingSchema } from '@kvika/api-types';
import { Colors } from '@kvika/theme';
import { GestureType } from 'react-native-gesture-handler';

import KvikaSpacer from '../../KvikaSpacer/KvikaSpacer';
import AssetDrawerRows from './AssetDrawerRows';
import { StyledContainer, StyledContentContainer } from './AssetDrawerStyles';
import AssetComposition from './AssetComposition';
import GraphWithButtons from './GraphWithButtons';

type Props = {
  asset: PortfolioHoldingSchema;
  onSetPanRef: (ref: React.MutableRefObject<GestureType | undefined>) => void;
};

const AssetDrawer = ({ asset, onSetPanRef }: Props) => {
  const { holdings } = asset.instrument;

  return (
    <StyledContentContainer showsVerticalScrollIndicator={false}>
      <GraphWithButtons instrument={asset.instrument} onSetPanRef={onSetPanRef} />
      <KvikaSpacer height={1} color={Colors.gray700} />

      <StyledContainer>
        <AssetDrawerRows asset={asset} />
        {holdings.length > 1 && <AssetComposition asset={asset} />}
      </StyledContainer>
    </StyledContentContainer>
  );
};
export default AssetDrawer;
