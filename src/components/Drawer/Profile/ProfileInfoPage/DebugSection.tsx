import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { FontSize } from '../../../../dls/StyleGuide';
import KvikaButton from '../../../KvikaButton/KvikaButton';
import { DebugRowContainer } from './ProfileInfoPageStyles';

type Props = {
  onResetUserPress: () => void;
  onDebugPushNotificationPress: () => void;
  isLoadingResetUser?: boolean;
};

const StyledActivityIndicator = styled(ActivityIndicator)`
  display: flex;
  align-self: center;
`;

export const DebugSection = ({ onResetUserPress, onDebugPushNotificationPress, isLoadingResetUser }: Props) => {
  return (
    <>
      <DebugRowContainer justifyContent="center">
        {isLoadingResetUser ? (
          <StyledActivityIndicator size="large" />
        ) : (
          <KvikaButton title="Hreinsa notanda" onPress={onResetUserPress} fontSize={FontSize.BodyLarge} light />
        )}
      </DebugRowContainer>
      <DebugRowContainer>
        <KvikaButton
          title="Prufa tilkynningu"
          onPress={onDebugPushNotificationPress}
          fontSize={FontSize.BodyLarge}
          light
        />
      </DebugRowContainer>
    </>
  );
};

export default DebugSection;
