import { Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaSpacer from '../../../components/KvikaSpacer/KvikaSpacer';
import KvikaText from '../../../components/KvikaText';

export const StyledSpacer = styled(KvikaSpacer)`
  margin-top: ${Grid['8px']};
`;

type Props = {
  skipMargin: boolean;
};

export const StyledCompositionRow = styled.View<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ skipMargin }) => (skipMargin ? Grid['8px'] : Grid['16px'])};
  flex-wrap: wrap;
`;

export const StyledCompositionTitle = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledCompositions = styled.View`
  padding: ${Grid['8px']} 0 ${Grid['8px']};
`;

export const StyledCompositionContainer = styled.View`
  margin: ${Grid['4px']} ${Grid['8px']} 0 ${Grid['8px']};
`;

export const StyledKvikaText = styled(KvikaText)`
  flex: 1;
  opacity: 0.8;
`;

export const StyledAmount = styled(KvikaText)`
  margin-left: ${Grid['16px']};
  opacity: 0.8;
`;
