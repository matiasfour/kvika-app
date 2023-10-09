import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';

export const StyledContainer = styled.View`
  flex: 1;
  padding: ${Grid['8px']} ${Grid['16px']} ${Grid['64px']};
`;

type ContentContainerProps = {
  maxHeight?: string;
};

export const StyledContentContainer = styled.ScrollView<ContentContainerProps>`
  display: flex;
  flex: 1;
`;

export const StyledHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${Grid['16px']};
  font-size: ${FontSize.H2}px;
  font-weight: ${FontWeight.Regular};
  line-height: ${FontSize.H2}px;
`;
