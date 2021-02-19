type ColorHexCode = string
type FontName = string

type ColorTokens = {
  brand50: ColorHexCode
  brand100: ColorHexCode
  brand200: ColorHexCode
  brand300: ColorHexCode
  brand400: ColorHexCode
  brand500: ColorHexCode
  brand600: ColorHexCode
  brand700: ColorHexCode
  brand800: ColorHexCode
  brand900: ColorHexCode

  gray50: ColorHexCode
  gray100: ColorHexCode
  gray200: ColorHexCode
  gray300: ColorHexCode
  gray400: ColorHexCode
  gray500: ColorHexCode
  gray600: ColorHexCode
  gray700: ColorHexCode
  gray800: ColorHexCode
  gray900: ColorHexCode

  black50: ColorHexCode
  black100: ColorHexCode
  black200: ColorHexCode
  black300: ColorHexCode
  black400: ColorHexCode
  black500: ColorHexCode
  black600: ColorHexCode
  black700: ColorHexCode
  black800: ColorHexCode
  black900: ColorHexCode

  green50: ColorHexCode
  green100: ColorHexCode
  green200: ColorHexCode
  green300: ColorHexCode
  green400: ColorHexCode
  green500: ColorHexCode
  green600: ColorHexCode
  green700: ColorHexCode
  green800: ColorHexCode
  green900: ColorHexCode

  blue50: ColorHexCode
  blue100: ColorHexCode
  blue200: ColorHexCode
  blue300: ColorHexCode
  blue400: ColorHexCode
  blue500: ColorHexCode
  blue600: ColorHexCode
  blue700: ColorHexCode
  blue800: ColorHexCode
  blue900: ColorHexCode

  pink50: ColorHexCode
  pink100: ColorHexCode
  pink200: ColorHexCode
  pink300: ColorHexCode
  pink400: ColorHexCode
  pink500: ColorHexCode
  pink600: ColorHexCode
  pink700: ColorHexCode
  pink800: ColorHexCode
  pink900: ColorHexCode

  yellow50: ColorHexCode
  yellow100: ColorHexCode
  yellow200: ColorHexCode
  yellow300: ColorHexCode
  yellow400: ColorHexCode
  yellow500: ColorHexCode
  yellow600: ColorHexCode
  yellow700: ColorHexCode
  yellow800: ColorHexCode
  yellow900: ColorHexCode

  purple50: ColorHexCode
  purple100: ColorHexCode
  purple200: ColorHexCode
  purple300: ColorHexCode
  purple400: ColorHexCode
  purple500: ColorHexCode
  purple600: ColorHexCode
  purple700: ColorHexCode
  purple800: ColorHexCode
  purple900: ColorHexCode

  red50: ColorHexCode
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
  brand50: '#F1F1FF',
  brand100: '#E2E2FF',
  brand200: '#C5C5FF',
  brand300: '#A9A8FF',
  brand400: '#8C8BFF',
  brand500: '#6F6EFF',
  brand600: '#5353BF',
  brand700: '#383780',
  brand800: '#1C1C40',
  brand900: '#0B0B1A',

  gray50: '#F8FAFB',
  gray100: '#F1F3F6',
  gray200: '#E3E8EE',
  gray300: '#D4DCE5',
  gray400: '#C6D1DD',
  gray500: '#B8C5D4',
  gray600: '#8A949F',
  gray700: '#5C636A',
  gray800: '#2E3135',
  gray900: '#121415',

  black50: '#EBECED',
  black100: '#D7D7DA',
  black200: '#AFAFB5',
  black300: '#868791',
  black400: '#5E5F6C',
  black500: '#363747',
  black600: '#292935',
  black700: '#1B1C24',
  black800: '#0E0E12',
  black900: '#050607',

  green50: '#EAFAF4',
  green100: '#D3F5E8',
  green200: '#A7EAD1',
  green300: '#7CE0BB',
  green400: '#50D5A4',
  green500: '#24CB8D',
  green600: '#1B986A',
  green700: '#126647',
  green800: '#093323',
  green900: '#04140E',

  blue50: '#E9F5FF',
  blue100: '#D2EAFD',
  blue200: '#A5D5FC',
  blue300: '#78C1FA',
  blue400: '#4BACF9',
  blue500: '#1E97F7',
  blue600: '#1771B9',
  blue700: '#0F4C7C',
  blue800: '#08263E',
  blue900: '#030F19',

  pink50: '#FFECF2',
  pink100: '#FDD8E4',
  pink200: '#FBB1CA',
  pink300: '#F98BAF',
  pink400: '#F76495',
  pink500: '#F53D7A',
  pink600: '#B82E5C',
  pink700: '#7B1F3D',
  pink800: '#3D0F1F',
  pink900: '#19060C',

  yellow50: '#FFFCF0',
  yellow100: '#FFF7E0',
  yellow200: '#FFF0C1',
  yellow300: '#FFE8A2',
  yellow400: '#FFE183',
  yellow500: '#FFD964',
  yellow600: '#BFA34B',
  yellow700: '#806D32',
  yellow800: '#403619',
  yellow900: '#1A160A',

  purple50: '#F9F1FF',
  purple100: '#F3E2FF',
  purple200: '#E7C5FF',
  purple300: '#DAA8FF',
  purple400: '#CE8BFF',
  purple500: '#C26EFF',
  purple600: '#9253BF',
  purple700: '#613780',
  purple800: '#311C40',
  purple900: '#130B1A',

  red50: '#FFF0F1',
  red100: '#FFDFE1',
  red200: '#FFC0C3',
  red300: '#FFA0A6',
  red400: '#FF8188',
  red500: '#FF616A',
  red600: '#BF4950',
  red700: '#803135',
  red800: '#40181B',
  red900: '#1A0A0B',
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
