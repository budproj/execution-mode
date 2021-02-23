type ColorHexCode = string
type FontName = string

export enum COLOR_SCHEME {
  BRAND = 'brand',
  GRAY = 'gray',
  UNIQUE_GRAY = 'uniqueGray',
  BLACK = 'black',
  GREEN = 'green',
  BLUE = 'blue',
  PINK = 'pink',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  RED = 'red',
}

type ColorToken =
  | `${COLOR_SCHEME}50`
  | `${COLOR_SCHEME}100`
  | `${COLOR_SCHEME}200`
  | `${COLOR_SCHEME}300`
  | `${COLOR_SCHEME}400`
  | `${COLOR_SCHEME}500`
  | `${COLOR_SCHEME}600`
  | `${COLOR_SCHEME}700`
  | `${COLOR_SCHEME}800`
  | `${COLOR_SCHEME}900`

type ColorTokens = Record<ColorToken, ColorHexCode>

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

  uniqueGray50: '#F3F5FA',
  uniqueGray100: '#A3B0C3',
  uniqueGray200: '#A2B3CE',
  uniqueGray300: '#8193AB',
  uniqueGray400: '#525F7F',
  uniqueGray500: '#30313F',
  uniqueGray600: '#000000',
  uniqueGray700: '#000000',
  uniqueGray800: '#000000',
  uniqueGray900: '#000000',

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
