import * as React from 'react';
import { BottomSheetModal, BottomSheetScrollView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import { Drawer } from '../../../types/Types';
import { FooterProps } from '../Footer/Footer';
import { renderBackdrop, renderFooter, renderHeaderHandle } from '../BottomDrawer/BottomDrawerRenderUtils';
import { styles } from '../BottomDrawer/BottomDrawerStyles';
import { getScaledPixels } from '../../../utils/Utils';

type Props = {
  onDismiss?: (drawer: Drawer) => void;
  children?: React.ReactNode | React.ReactNode[];
  onConfirm?: () => void;
  showFooter?: boolean;
  confirmButtonText?: string;
  confirmButtonIcon?: React.ReactNode;
  name: Drawer;
  onSwitchProfile?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  dismissOnConfirm?: boolean;
  showBackButton?: boolean;
};

const ProfileDrawer = React.forwardRef(
  (
    {
      onDismiss,
      children,
      onConfirm,
      showFooter = true,
      confirmButtonText,
      confirmButtonIcon,
      name,
      onSwitchProfile,
      isLoading,
      disabled,
      dismissOnConfirm,
      showBackButton,
    }: Props,
    ref: React.ForwardedRef<BottomSheetModal>
  ) => {
    const snapPoints = React.useMemo(() => ['90%'], []);

    const renderHeaderHandleCallback = React.useCallback((props) => {
      return renderHeaderHandle(props);
    }, []);

    const { handleContentLayout } = useBottomSheetDynamicSnapPoints(snapPoints);

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
          style={{
            marginBottom: showFooter ? getScaledPixels(50) : 0,
            display: 'flex',
            flex: 1,
          }}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

ProfileDrawer.displayName = 'ProfileDrawer';

export default ProfileDrawer;
