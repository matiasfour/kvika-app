import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import { useAnalytics } from '@segment/analytics-react-native';
import * as React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { BASE_ANIMATION_SPEED } from '../../constants/GeneralConstants';
import { Color, FontSize } from '../../dls/StyleGuide';
import { CategoryComposition, SegmentTrackingId } from '../../types/Types';
import {
  StyledHoldingIdentifier,
  StyledHolding,
  StyledHoldingName,
  StyledHoldingText,
} from './PortfoliosCompositionStyles';

type Props = {
  composition: CategoryComposition;
  isSelected: boolean;
  onCompositionPress: (portfolio: CategoryComposition | undefined) => void;
  color: Colors | Color;
};

const CompositionSummaryRow = ({ isSelected, onCompositionPress, composition, color }: Props) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const { track } = useAnalytics();

  const handleAnimateHolding = React.useCallback(
    (selected: boolean) => {
      Animated.timing(animatedValue, {
        toValue: selected ? 100 : 0,
        duration: BASE_ANIMATION_SPEED,
        useNativeDriver: false,
      }).start();
    },
    [animatedValue]
  );

  React.useEffect(() => {
    handleAnimateHolding(isSelected);
  }, [handleAnimateHolding, isSelected]);

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          backgroundColor: isSelected
            ? animatedValue.interpolate({ inputRange: [0, 100], outputRange: [Colors.black7, Colors.black11] })
            : Colors.black7,
        },
      ]}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          track(SegmentTrackingId.FocusAssetComposition, { ...(isSelected && { composition }) });
          // To deselect a composition if its pressed again
          onCompositionPress(isSelected ? undefined : composition);
        }}
      >
        <StyledHolding>
          <StyledHoldingName>
            <StyledHoldingIdentifier colorIdentifier={color} />
            <StyledHoldingText fontSize={FontSize.BodySmall}>{composition.category}</StyledHoldingText>
          </StyledHoldingName>
          <StyledHoldingText fontSize={FontSize.BodySmall}>
            {getFormattedNumber({ value: composition.value })}
          </StyledHoldingText>
        </StyledHolding>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});

export default CompositionSummaryRow;
