import { Colors } from '@kvika/theme';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { FontSize, FontWeight } from '../../../../dls/StyleGuide';
import ArrowLeft from '../../../../svg/ArrowLeft';
import { StyledDescription, StyledTitle } from './ProfilePageHeaderStyles';

type Props = { title: string; description: string; onBackPress: () => void };

const ProfilePageHeader = ({ title, description, onBackPress }: Props) => {
  return (
    <View>
      <Pressable onPress={onBackPress}>
        <ArrowLeft color={Colors.gold150} width={FontSize.Large} height={FontSize.Large} />
      </Pressable>
      <StyledTitle fontSize={FontSize.BodyLarge} fontWeight={FontWeight.Medium}>
        {title}
      </StyledTitle>
      <StyledDescription color={Colors.gold250}>{description}</StyledDescription>
    </View>
  );
};
export default ProfilePageHeader;
