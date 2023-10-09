import styled from 'styled-components/native';
import { Colors, Grid } from '@kvika/theme';

export const StyledView = styled.View`
  flex: 2;
`;

export const StyledPhoneInput = styled.View`
  padding-bottom: ${Grid['16px']};
  margin-bottom: ${Grid['8px']};
  border-bottom-color: ${Colors.goldGray600};
  border-bottom-width: 2px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StyledVerificationNumberView = styled.View`
  display: flex;
  flex-direction: row;
`;
