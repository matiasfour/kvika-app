import * as React from 'react';
import { BottomSheetModal, BottomSheetScrollView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import { GestureType } from 'react-native-gesture-handler';
import { Drawer } from '../../../types/Types';
import { renderBackdrop, renderHeaderHandle } from '../BottomDrawer/BottomDrawerRenderUtils';
import { styles } from '../BottomDrawer/BottomDrawerStyles';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  name: Drawer;
  graphPanRef: React.MutableRefObject<GestureType | undefined> | undefined;
};

// TODO: name: _name was needed to fix a weird typescript error in AssetScreen
const AssetBottomDrawer = React.forwardRef(
  ({ children, name: _name, graphPanRef }: Props, ref: React.ForwardedRef<BottomSheetModal>) => {
    const snapPoints = React.useMemo(() => ['90%'], []);

    const { handleContentLayout } = useBottomSheetDynamicSnapPoints(snapPoints);

    const renderHeaderHandleCallback = React.useCallback((props) => {
      return renderHeaderHandle(props);
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        handleComponent={renderHeaderHandleCallback}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        simultaneousHandlers={graphPanRef}
      >
        <BottomSheetScrollView onLayout={handleContentLayout}>{children}</BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

AssetBottomDrawer.displayName = 'AssetBottomDrawer';

export default AssetBottomDrawer;
