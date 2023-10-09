import * as React from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '@kvika/theme';
import KvikaText from '../KvikaText';
import { FontSize, FontWeight } from '../../dls/StyleGuide';
import { StyledPressable, StyledContainer, StyledIconContainer } from './KvikaButtonStyles';
import { getButtonTextColor } from '../../utils/Utils';

type Props = {
  title?: string;
  onPress?(): void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  large?: boolean;
  disabled?: boolean;
  fontSize?: FontSize;
  selected?: boolean;
  light?: boolean;
  transparent?: boolean;
  isLoading?: boolean;
};

const KvikaButton = ({
  title,
  onPress,
  icon,
  style,
  large,
  disabled,
  fontSize,
  selected,
  light,
  transparent,
  isLoading = false,
}: Props) => {
  return (
    <StyledPressable onPress={onPress} style={style} large={large} disabled={disabled}>
      {({ pressed }) => (
        <StyledContainer light={light} pressed={pressed} selected={selected} transparent={transparent}>
          {isLoading ? (
            <ActivityIndicator color={Colors.goldGray600} />
          ) : (
            <>
              {icon && <StyledIconContainer>{icon}</StyledIconContainer>}
              {title && (
                <KvikaText
                  fontWeight={FontWeight.Medium}
                  fontSize={fontSize}
                  color={getButtonTextColor(disabled)}
                  style={{ marginLeft: 8 }}
                >
                  {title}
                </KvikaText>
              )}
            </>
          )}
        </StyledContainer>
      )}
    </StyledPressable>
  );
};

export default KvikaButton;
