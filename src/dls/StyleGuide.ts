import { Colors } from '@kvika/theme';

export enum Color {
  blue = '#7F9BC7', // These two are missing from the design system so we need to define them locally for now
  lightBlue = '#C6D2E6', // These two are missing from the design system so we need to define them locally for now
}

export enum FontFamily {
  AkzidenzRegular = 'AkzidenzGroteskPro-Regular',
  AkzidenzItalic = 'AkzidenzGroteskPro-Italic',
  AkzidenzBold = 'AkzidenzGroteskPro-Bold',
  AkzidenzLight = 'AkzidenzGroteskPro-Light',
  AkzidenzMedium = 'AkzidenzGroteskPro-Medium',
}

export enum FontSize {
  XS = 10,
  Small = 12,
  BodyRegular = 13,
  BodySmall = 14,
  Body = 16,
  BodyLarge = 18,
  BodyXLarge = 20,
  H2 = 22,
  Large = 24,
  H1Small = 26,
  H1 = 28,
  XL = 32,
  XXL = 40,
}

export enum FontWeight {
  Light = 300,
  Regular = 400,
  Medium = 500,
  Bold = 700,
}

export type FontStyle = 'normal' | 'italic';

export const PORTFOLIO_COMPOSITION_COLORS = [
  Colors.gold400,
  Colors.gold250,
  Colors.gold150,
  Color.blue,
  Color.lightBlue,
];
