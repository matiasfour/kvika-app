import * as React from 'react';
import { Animated, NativeSyntheticEvent, TextInputSelectionChangeEventData, View } from 'react-native';

import * as Haptics from 'expo-haptics';

import { Colors } from '@kvika/theme';
import { prettifySSN } from '@kvika/string-utils';
import KvikaText from '../../../components/KvikaText';
import Numpad, { Key } from './Numpad';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import { StyledPhoneInput, StyledVerificationNumberView, StyledView } from './LoginInputStyles';
import { LoginScreenText } from '../../../constants/Text';
import LoginTabs from '../LoginTabs/LoginTabs';
import { SelectedTab, SelectionState } from '../../../types/Types';
import IdentifierInput from './IdentifierInput';

export type LabelPosition = 'corner' | 'center';

type Props = {
  onLoginPress(): void;
  isLoading: boolean;
  isLoggingInWithEID: boolean;
  verificationCode?: string;
  identifier: string;
  setIdentifier(identifier: string): void;
  selectedTab: SelectedTab;
  handleChangeTab(index: number): void;
  tabTitles: LoginScreenText[];
};

const MAX_LENGTH_PHONE = 7;
const MAX_LENGTH_SSN = 10;

const LoginInput = ({
  onLoginPress,
  isLoading,
  isLoggingInWithEID,
  verificationCode,
  identifier,
  setIdentifier,
  selectedTab,
  handleChangeTab,
  tabTitles,
}: Props) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [inputWidth, setInputWidth] = React.useState(0);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [selectionState, setSelectionState] = React.useState<SelectionState>({ start: 0, end: 0 });
  const MAX_LENGTH = isLoggingInWithEID ? MAX_LENGTH_PHONE : MAX_LENGTH_SSN;
  const animatedStyles = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -((inputWidth - labelWidth) / 2)],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const handleCharacterPositions = (syntheticEvent: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    const { nativeEvent } = syntheticEvent;
    const { selection } = nativeEvent;
    setSelectionState({ ...selectionState, start: selection.start, end: selection.end });
  };

  const getUpdatedIdentifier = () => {
    if (selectionState.start === selectionState.end) {
      return identifier.slice(0, selectionState.start - 1) + identifier.slice(selectionState.end);
    }
    return identifier.slice(0, selectionState.start) + identifier.slice(selectionState.end);
  };

  const handlePress = (key: Key, number?: string) => {
    switch (key) {
      case Key.Backspace: {
        if (selectionState.start === 0 && selectionState.end === 0) {
          break;
        }

        const updatedInputValue = getUpdatedIdentifier();
        setIdentifier(updatedInputValue);

        if (updatedInputValue.length === 0 && updatedInputValue !== identifier) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }

        if (selectionState.start === selectionState.end && selectionState.end > 0) {
          setSelectionState({ ...selectionState, start: selectionState.start - 1, end: selectionState.end - 1 });
        }

        break;
      }
      case Key.Enter: {
        if (identifier.length === MAX_LENGTH) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onLoginPress();
        }
        break;
      }
      case Key.Number: {
        if (selectionState.start < MAX_LENGTH) {
          setSelectionState({ ...selectionState, start: selectionState.start + 1, end: selectionState.end + 1 });
        }
        if (identifier.length === 0) {
          handleAnimateLabel('corner');
        }
        if (identifier.length < MAX_LENGTH && number) {
          const result = identifier.slice(0, selectionState.start) + number + identifier.slice(selectionState.start);
          setIdentifier(result);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleAnimateLabel = (position: LabelPosition) => {
    Animated.timing(animatedValue, {
      toValue: position === 'corner' ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleIdentifierInputOnFocus = () => {
    handleAnimateLabel('corner');
  };

  const prettifiedIdentifier = isLoggingInWithEID ? identifier : prettifySSN(identifier);

  const renderInputContent = () => {
    if (verificationCode) {
      return (
        <>
          <KvikaText>{LoginScreenText.OpenApp}</KvikaText>
          <StyledVerificationNumberView>
            <KvikaText>{`${LoginScreenText.VerificationNumber}: `}</KvikaText>
            <KvikaText fontWeight={FontWeight.Bold}>{verificationCode}</KvikaText>
          </StyledVerificationNumberView>
        </>
      );
    }
    return (
      <IdentifierInput handleFocus={handleIdentifierInputOnFocus} handleCharactersPosition={handleCharacterPositions}>
        {prettifiedIdentifier}
      </IdentifierInput>
    );
  };

  return (
    <>
      <LoginTabs
        selectedTab={selectedTab}
        onTabChange={(index) => {
          handleChangeTab(index);
        }}
        tabTitles={tabTitles}
      />
      <StyledView>
        <View onLayout={(event) => setInputWidth(event.nativeEvent.layout.width)}>
          <StyledPhoneInput>
            <View onLayout={(event) => setLabelWidth(event.nativeEvent.layout.width)}>
              {!verificationCode && (
                <Animated.View style={animatedStyles}>
                  <KvikaText fontWeight={FontWeight.Medium} color={Colors.gold250} fontSize={FontSize.BodySmall}>
                    {isLoggingInWithEID ? LoginScreenText.PhoneNumber : LoginScreenText.SocialSecurityNumber}
                  </KvikaText>
                </Animated.View>
              )}
            </View>
            {renderInputContent()}
          </StyledPhoneInput>
        </View>
        <Numpad onPress={handlePress} isSubmitEnabled={identifier.length === MAX_LENGTH} isLoading={isLoading} />
      </StyledView>
    </>
  );
};

export default LoginInput;
