import { Colors } from '@kvika/theme';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

type LayoutProps = {
  backgroundColor?: Colors;
};

const StyledView = styled.View<LayoutProps>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: Colors;
};

const ScreenLayout = ({ children, style, backgroundColor = Colors.black3 }: Props) => {
  return (
    <StyledView backgroundColor={backgroundColor} style={style}>
      {children}
    </StyledView>
  );
};

export default ScreenLayout;
