import styled from 'styled-components/native';
import { Colors, Grid } from '@kvika/theme';
import { Color } from '../../dls/StyleGuide';
import KvikaText from '../KvikaText';

export const StyledContainer = styled.View`
  display: flex;
  flex-flow: row wrap;
  background-color: ${Colors.black7};
  width: 100%;
`;

export const StyledTitle = styled(KvikaText)`
  line-height: 16px;
  width: 100%;
  padding: ${Grid['16px']};
`;

export const StyledHoldingsContainer = styled.View`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const StyledHolding = styled.View`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  padding: 12px ${Grid['16px']} 12px ${Grid['16px']};
`;

export const StyledHoldingName = styled.View`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const StyledHoldingText = styled(KvikaText)`
  line-height: 16px;
  color: ${Colors.gold100};
`;

type HoldingIdentifierProps = {
  colorIdentifier: Color | Colors;
};

export const StyledHoldingIdentifier = styled.View<HoldingIdentifierProps>`
  width: 3px;
  height: 16px;
  margin-right: ${Grid['8px']};
  background-color: ${(props) => props.colorIdentifier};
`;
