import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  margin-top: ${Grid['4px']};
  flex: 1;
`;

export const StyledContent = styled.View`
  flex: 1;
`;

type RowProps = {
  isLastRow?: boolean;
};

export const StyledRow = styled.View<RowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.isLastRow ? Grid['4px'] : 0)};
  margin-top: ${(props) => (props.isLastRow ? Grid['4px'] : 0)};
`;

export const StyledTransactionContainer = styled.Pressable`
  padding: ${Grid['8px']} ${Grid['16px']};
  background-color: ${Colors.black7};
  margin-bottom: 2px;
`;

export const StyledHeaderContainer = styled.View`
  padding: ${Grid['16px']} 0 ${Grid['8px']} ${Grid['16px']};
`;

export const StyledPillContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
