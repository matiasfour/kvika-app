import * as React from 'react';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { Drawer } from '../../../types/Types';
import { renderBackdrop, renderFooter, renderHeaderHandle } from './BottomDrawerRenderUtils';
import { styles } from './BottomDrawerStyles';
import { FooterProps } from '../Footer/Footer';
import { getScaledPixels } from '../../../utils/Utils';

type Props = {
  onDismiss?: (drawer: Drawer) => void;
  children?: React.ReactNode | React.ReactNode[];
  onConfirm?: () => void;
  showFooter?: boolean;
  confirmButtonText?: string;
  confirmButtonIcon?: React.ReactNode;
  name: Drawer;
  height?: string | number;
  onSwitchProfile?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  dismissOnConfirm?: boolean;
  showBackButton?: boolean;
  hasStaticHeight?: boolean;
};

const BottomDrawer = React.forwardRef(
  (
    {
      onDismiss,
      children,
      onConfirm,
      showFooter = true,
      confirmButtonText,
      confirmButtonIcon,
      name,
      height,
      onSwitchProfile,
      isLoading,
      disabled,
      dismissOnConfirm,
      showBackButton,
      hasStaticHeight,
    }: Props,
    ref: React.ForwardedRef<BottomSheetModal>
  ) => {
    const snapPoints = React.useMemo(
      () => [hasStaticHeight ? '90%' : height ?? 'CONTENT_HEIGHT'],
      [height, hasStaticHeight]
    );

    const renderHeaderHandleCallback = React.useCallback((props) => {
      return renderHeaderHandle(props);
    }, []);

    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(snapPoints);

    const onDismissFooter = React.useMemo(() => (onDismiss ? () => onDismiss(name) : undefined), [name, onDismiss]);

    const renderFooterCallback = React.useCallback(
      (props) => {
        const footerProps: FooterProps = {
          onConfirm,
          onDismiss: onDismissFooter,
          confirmButtonText,
          confirmButtonIcon,
          onSwitchProfile,
          isLoading,
          disabled,
          dismissOnConfirm,
          showBackButton,
        };
        return renderFooter(props, footerProps, showFooter);
      },
      [
        confirmButtonIcon,
        confirmButtonText,
        isLoading,
        onConfirm,
        onDismissFooter,
        onSwitchProfile,
        showFooter,
        disabled,
        dismissOnConfirm,
        showBackButton,
      ]
    );

    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {hasStaticHeight ? (
          <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            onDismiss={() => onDismiss && onDismiss(name)}
            handleComponent={renderHeaderHandleCallback}
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.indicator}
            enablePanDownToClose
            enableDismissOnClose
            name={name}
            backdropComponent={renderBackdrop}
            footerComponent={renderFooterCallback}
          >
            <BottomSheetScrollView
              onLayout={handleContentLayout}
              style={{ flex: 1, display: 'flex', marginBottom: showFooter ? getScaledPixels(100) : 0 }}
            >
              {children}
            </BottomSheetScrollView>
          </BottomSheetModal>
        ) : (
          <BottomSheetModal
            ref={ref}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            onDismiss={() => onDismiss && onDismiss(name)}
            handleComponent={renderHeaderHandleCallback}
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.indicator}
            enablePanDownToClose
            enableDismissOnClose
            name={name}
            backdropComponent={renderBackdrop}
            footerComponent={renderFooterCallback}
          >
            <BottomSheetView
              onLayout={handleContentLayout}
              style={{ flex: 1, display: 'flex', paddingBottom: showFooter ? getScaledPixels(100) : 0 }}
            >
              {children}
            </BottomSheetView>
          </BottomSheetModal>
        )}
      </>
    );
  }
);

BottomDrawer.displayName = 'BottomDrawer';

export default BottomDrawer;
