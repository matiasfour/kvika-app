import { Colors } from '@kvika/theme';
import * as React from 'react';
import { TextProps, TextInput, NativeSyntheticEvent, TextInputSelectionChangeEventData, TextStyle } from 'react-native';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';

type Props = {
  children: string | number | React.ReactElement<TextProps>;
  handleCharactersPosition: (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
  handleFocus: () => void;
};

const textInputStyles: TextStyle = {
  color: Colors.gold150,
  fontSize: FontSize.XL,
  fontWeight: `${FontWeight.Light}`,
  fontStyle: 'normal',
  width: '100%',
  textAlign: 'center',
};

const IdentifierInput = ({ children, handleCharactersPosition, handleFocus }: Props) => {
  return (
    <TextInput
      allowFontScaling
      style={{ ...textInputStyles }}
      showSoftInputOnFocus={false}
      onSelectionChange={handleCharactersPosition}
      onFocus={handleFocus}
    >
      {children}
    </TextInput>
  );
};

export default IdentifierInput;
