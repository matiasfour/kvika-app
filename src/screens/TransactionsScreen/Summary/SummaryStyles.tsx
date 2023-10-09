import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaText from '../../../components/KvikaText';

export const StyledContainer = styled.ScrollView`
  padding: 0 ${Grid['16px']};
  background-color: ${Colors.black7};
`;

type RowProps = {
  hasPaddingTop?: boolean;
};

export const SummaryRow = styled.View<RowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${Grid['24px']};
  padding-top: ${({ hasPaddingTop }) => (hasPaddingTop ? Grid['24px'] : 0)};
`;

export const SummaryContainer = styled.View`
  padding-left: ${Grid['8px']};
`;

export const StyledSummaryTitle = styled(KvikaText)`
  max-width: 58%;
`;
