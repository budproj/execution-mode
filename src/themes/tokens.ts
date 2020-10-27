type ColorHexCode = string
type FontName = string

type ColorTokens = {
  white: ColorHexCode
  black: ColorHexCode

  g100: ColorHexCode
  g200: ColorHexCode
  g300: ColorHexCode
  g400: ColorHexCode
  g500: ColorHexCode
  g600: ColorHexCode
  g700: ColorHexCode
  g800: ColorHexCode
  g900: ColorHexCode

  b100: ColorHexCode
  b200: ColorHexCode
  b300: ColorHexCode
  b400: ColorHexCode
  b500: ColorHexCode
  b600: ColorHexCode
  b700: ColorHexCode
  b800: ColorHexCode
  b900: ColorHexCode

  c100: ColorHexCode
  c200: ColorHexCode
  c300: ColorHexCode
  c400: ColorHexCode
  c500: ColorHexCode
  c600: ColorHexCode
  c700: ColorHexCode
  c800: ColorHexCode
  c900: ColorHexCode
}

type FontTokens = {
  base: FontName
  circularstd: FontName
}

const colors: ColorTokens = {
  white: '#FFFFFF',
  black: '#000000',

  g100: '#DDE5EE',
  g200: '#CBCFD9',
  g300: '#979FB2',
  g400: '#757F99',
  g500: '#525F7F',
  g600: '#424C66',
  g700: '#31394C',
  g800: '#212633',
  g900: '#101319',

  b100: '#F1F1FF',
  b200: '#E2E2FF',
  b300: '#E3E3FF',
  b400: '#9A9AFF',
  b500: '#6F6EFF',
  b600: '#5958CC',
  b700: '#434299',
  b800: '#2C2C66',
  b900: '#161633',

  c100: '#E9F5FE',
  c200: '#E1F1FE',
  c300: '#92CDFC',
  c400: '#51AEFA',
  c500: '#259AF9',
  c600: '#1E7BC7',
  c700: '#165C95',
  c800: '#0F3E64',
  c900: '#071F32',
}

const fonts: FontTokens = {
  base: 'CircularStd',
  circularstd: 'CircularStd',
}

export default {
  colors,
  fonts,
}
