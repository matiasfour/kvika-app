import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';

type ContentContainerProps = {
  maxHeight?: string;
};

export const StyledContentContainer = styled.ScrollView<ContentContainerProps>`
  display: flex;
  flex: 1;
  padding-top: 12px;
`;

export const StyledHeaderView = styled.View`
  padding-bottom: ${Grid['4px']};
`;

type ViewProps = {
  hasMarginLeft?: boolean;
};

export const StyledView = styled.View<ViewProps>`
  margin-left: ${({ hasMarginLeft }) => (hasMarginLeft ? Grid['16px'] : 0)};
  display: flex;
  flex: 1;
`;
