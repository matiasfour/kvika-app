import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaText from '../../../components/KvikaText';

type FundRowProps = {
  isLastRow?: boolean;
};

export const StyledFundRow = styled.View<FundRowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.isLastRow ? '0px' : '2px')};
`;

type PillProps = {
  isLoss?: boolean;
};

export const StyledPill = styled.View<PillProps>`
  display: flex;
  align-self: flex-end;
  background-color: ${(props) => (props.isLoss ? Colors.negativeDark700 : Colors.successDark700)};
  padding: ${Grid['4px']};
  border-radius: ${Grid['2px']};
`;

export const StyledKvikaText = styled(KvikaText)`
  align-self: center;
`;

export const StyledContainer = styled.View`
  background-color: ${Colors.black7};
  padding: ${Grid['8px']} ${Grid['16px']} 12px;
  margin-bottom: ${Grid['2px']};
`;

export const StyledAmount = styled(KvikaText)`
  max-width: 40%;
`;
