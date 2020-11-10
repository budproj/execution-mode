type ColorHexCode = string
type FontName = string

type ColorTokens = {
  white: ColorHexCode
  black: ColorHexCode

  grey50: ColorHexCode
  grey100: ColorHexCode
  grey200: ColorHexCode
  grey300: ColorHexCode
  grey400: ColorHexCode
  grey500: ColorHexCode
  grey600: ColorHexCode
  grey700: ColorHexCode
  grey800: ColorHexCode
  grey900: ColorHexCode

  blue100: ColorHexCode
  blue200: ColorHexCode
  blue300: ColorHexCode
  blue400: ColorHexCode
  blue500: ColorHexCode
  blue600: ColorHexCode
  blue700: ColorHexCode
  blue800: ColorHexCode
  blue900: ColorHexCode

  cyan50: ColorHexCode
  cyan100: ColorHexCode
  cyan200: ColorHexCode
  cyan300: ColorHexCode
  cyan400: ColorHexCode
  cyan500: ColorHexCode
  cyan600: ColorHexCode
  cyan700: ColorHexCode
  cyan800: ColorHexCode
  cyan900: ColorHexCode

  green100: ColorHexCode
  green200: ColorHexCode
  green300: ColorHexCode
  green400: ColorHexCode
  green500: ColorHexCode
  green600: ColorHexCode
  green700: ColorHexCode
  green800: ColorHexCode
  green900: ColorHexCode

  yellow100: ColorHexCode
  yellow200: ColorHexCode
  yellow300: ColorHexCode
  yellow400: ColorHexCode
  yellow500: ColorHexCode
  yellow600: ColorHexCode
  yellow700: ColorHexCode
  yellow800: ColorHexCode
  yellow900: ColorHexCode

  red100: ColorHexCode
  red200: ColorHexCode
  red300: ColorHexCode
  red400: ColorHexCode
  red500: ColorHexCode
  red600: ColorHexCode
  red700: ColorHexCode
  red800: ColorHexCode
  red900: ColorHexCode
}

type FontTokens = {
  base: FontName
  circularstd: FontName
  fallback: FontName
}

const colors: ColorTokens = {
  white: '#FFFFFF',
  black: '#000000',

  grey50: '#F5F8F9',
  grey100: '#DDE5EE',
  grey200: '#CBCFD9',
  grey300: '#B8C5D4',
  grey400: '#757F99',
  grey500: '#525F7F',
  grey600: '#424C66',
  grey700: '#31394C',
  grey800: '#212633',
  grey900: '#101319',

  blue100: '#F1F1FF',
  blue200: '#E2E2FF',
  blue300: '#E3E3FF',
  blue400: '#9A9AFF',
  blue500: '#6F6EFF',
  blue600: '#5958CC',
  blue700: '#434299',
  blue800: '#2C2C66',
  blue900: '#161633',

  cyan50: '#F7FAFE',
  cyan100: '#E9F5FE',
  cyan200: '#E1F1FE',
  cyan300: '#92CDFC',
  cyan400: '#51AEFA',
  cyan500: '#259AF9',
  cyan600: '#1E7BC7',
  cyan700: '#165C95',
  cyan800: '#0F3E64',
  cyan900: '#071F32',

  green100: '#BDEFDD',
  green200: '#92E5C6',
  green300: '#66DBAF',
  green400: '#50D5A4',
  green500: '#24CB8D',
  green600: '#1DA271',
  green700: '#167A55',
  green800: '#126647',
  green900: '#0B3D2A',

  yellow100: '#FFF7E0',
  yellow200: '#FFF0C1',
  yellow300: '#FFE8A2',
  yellow400: '#FFE183',
  yellow500: '#FFD964',
  yellow600: '#E6C35A',
  yellow700: '#B39846',
  yellow800: '#806D32',
  yellow900: '#4C411E',

  red100: '#FFDFE1',
  red200: '#FFC0C3',
  red300: '#FFA0A6',
  red400: '#FF8188',
  red500: '#FF616A',
  red600: '#CC4E55',
  red700: '#993A40',
  red800: '#66272A',
  red900: '#331315',
}

const fonts: FontTokens = {
  base: 'CircularStd',
  circularstd: 'CircularStd',
  fallback: 'sans-serif',
}

const tokens = {
  colors,
  fonts,
}

export default tokens
