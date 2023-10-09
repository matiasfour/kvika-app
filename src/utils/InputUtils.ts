import { FontFamily, FontStyle, FontWeight } from '../dls/StyleGuide';

export const getFontFamily = (fontWeight: FontWeight, fontStyle: FontStyle): FontFamily => {
  if (fontStyle === 'italic') {
    return FontFamily.AkzidenzItalic;
  }
  switch (fontWeight) {
    case FontWeight.Light:
      return FontFamily.AkzidenzLight;
    case FontWeight.Medium:
      return FontFamily.AkzidenzMedium;
    case FontWeight.Bold:
      return FontFamily.AkzidenzBold;
    case FontWeight.Regular:
    default:
      return FontFamily.AkzidenzRegular;
  }
};
