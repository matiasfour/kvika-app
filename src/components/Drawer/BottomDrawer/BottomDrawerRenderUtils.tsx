import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import * as React from 'react';
import Footer, { FooterProps } from '../Footer/Footer';
import { HeaderHandle, HeaderHandleProps } from '../HeaderHandle';

export const renderHeaderHandle = (props: HeaderHandleProps) => {
  return <HeaderHandle {...props} />;
};

export const renderBackdrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" opacity={0.6} />
  );
};

export const renderFooter = (props: BottomSheetFooterProps, footerProps?: FooterProps, showFooter = true) => {
  return <BottomSheetFooter {...props}>{showFooter && <Footer {...footerProps} />}</BottomSheetFooter>;
};
