import { Colors } from '@kvika/theme';
import * as React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { FontSize, FontStyle, FontWeight } from '../dls/StyleGuide';
import { getFontFamily } from '../utils/InputUtils';

type Props = {
  color?: Colors;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  style?: StyleProp<TextStyle>;
  children: string | number | React.ReactElement<TextProps>;
  numberOfLines?: number;
  allowFontScaling?: boolean;
};

/**
 * This is the recommended way to use consistent fonts and sizes across an application.
 * I.e. to create a component "MyAppText" that includes them and use this component across the app.
 * This component should only accept the most basic text variables: font weight, style, size & color
 * along with a generic style object for further styling.
 */
const KvikaText = ({
  color = Colors.gold150,
  fontSize = FontSize.Body,
  fontWeight = FontWeight.Regular,
  fontStyle = 'normal',
  style,
  children,
  numberOfLines = 0,
  allowFontScaling = true,
}: Props) => {
  const fontFamily = getFontFamily(fontWeight, fontStyle);
  return (
    <Text
      ellipsizeMode="clip"
      allowFontScaling={allowFontScaling}
      numberOfLines={numberOfLines}
      style={[style, { fontFamily, color, fontSize }]}
    >
      {children}
    </Text>
  );
};

export default KvikaText;
