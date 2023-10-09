import { Colors, Grid } from '@kvika/theme';
import styled from 'styled-components/native';
import KvikaButton from '../../KvikaButton/KvikaButton';

export const StyledKvikaButton = styled(KvikaButton)`
  margin: ${Grid['4px']};
`;

type FooterProps = {
  isProfileDrawer?: boolean;
};

export const StyledFooter = styled.View<FooterProps>`
  display: flex;
  flex-direction: ${({ isProfileDrawer }) => (isProfileDrawer ? 'column' : 'row')};
  justify-content: space-between;
  padding: 0 ${Grid['16px']} ${Grid['32px']} ${Grid['16px']};
  background-color: ${Colors.black7};
  box-shadow: 0 -${Grid['8px']} 5px ${Colors.black7};
`;
