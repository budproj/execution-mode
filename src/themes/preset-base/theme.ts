import { extendTheme } from '@chakra-ui/react'

import tokens from 'src/themes/tokens'

import {
  Button,
  Skeleton,
  Tooltip,
  FormLabel,
  Input,
  Popover,
  Textarea,
  Menu,
  Modal,
  Alert,
  Avatar,
  Editable,
  Tabs,
  Drawer,
} from './components'

const colors = {
  brand: {
    50: tokens.colors.brand50,
    100: tokens.colors.brand100,
    200: tokens.colors.brand200,
    300: tokens.colors.brand300,
    400: tokens.colors.brand400,
    500: tokens.colors.brand500,
    600: tokens.colors.brand600,
    700: tokens.colors.brand700,
    800: tokens.colors.brand800,
    900: tokens.colors.brand900,
  },

  black: {
    50: tokens.colors.black50,
    100: tokens.colors.black100,
    200: tokens.colors.black200,
    300: tokens.colors.black300,
    400: tokens.colors.black400,
    500: tokens.colors.black500,
    600: tokens.colors.black600,
    700: tokens.colors.black700,
    800: tokens.colors.black800,
    900: tokens.colors.black900,
  },

  gray: {
    50: tokens.colors.gray50,
    100: tokens.colors.gray100,
    200: tokens.colors.gray200,
    300: tokens.colors.gray300,
    400: tokens.colors.gray400,
    500: tokens.colors.gray500,
    600: tokens.colors.gray600,
    700: tokens.colors.gray700,
    800: tokens.colors.gray800,
    900: tokens.colors.gray900,
  },

  green: {
    50: tokens.colors.green50,
    100: tokens.colors.green100,
    200: tokens.colors.green200,
    300: tokens.colors.green300,
    400: tokens.colors.green400,
    500: tokens.colors.green500,
    600: tokens.colors.green600,
    700: tokens.colors.green700,
    800: tokens.colors.green800,
    900: tokens.colors.green900,
  },

  blue: {
    50: tokens.colors.blue50,
    100: tokens.colors.blue100,
    200: tokens.colors.blue200,
    300: tokens.colors.blue300,
    400: tokens.colors.blue400,
    500: tokens.colors.blue500,
    600: tokens.colors.blue600,
    700: tokens.colors.blue700,
    800: tokens.colors.blue800,
    900: tokens.colors.blue900,
  },

  pink: {
    50: tokens.colors.pink50,
    100: tokens.colors.pink100,
    200: tokens.colors.pink200,
    300: tokens.colors.pink300,
    400: tokens.colors.pink400,
    500: tokens.colors.pink500,
    600: tokens.colors.pink600,
    700: tokens.colors.pink700,
    800: tokens.colors.pink800,
    900: tokens.colors.pink900,
  },

  yellow: {
    50: tokens.colors.yellow50,
    100: tokens.colors.yellow100,
    200: tokens.colors.yellow200,
    300: tokens.colors.yellow300,
    400: tokens.colors.yellow400,
    500: tokens.colors.yellow500,
    600: tokens.colors.yellow600,
    700: tokens.colors.yellow700,
    800: tokens.colors.yellow800,
    900: tokens.colors.yellow900,
  },

  purple: {
    50: tokens.colors.purple50,
    100: tokens.colors.purple100,
    200: tokens.colors.purple200,
    300: tokens.colors.purple300,
    400: tokens.colors.purple400,
    500: tokens.colors.purple500,
    600: tokens.colors.purple600,
    700: tokens.colors.purple700,
    800: tokens.colors.purple800,
    900: tokens.colors.purple900,
  },

  red: {
    50: tokens.colors.red50,
    100: tokens.colors.red100,
    200: tokens.colors.red200,
    300: tokens.colors.red300,
    400: tokens.colors.red400,
    500: tokens.colors.red500,
    600: tokens.colors.red600,
    700: tokens.colors.red700,
    800: tokens.colors.red800,
    900: tokens.colors.red900,
  },
}

const theme = extendTheme({
  colors,

  styles: {
    global: (properties) => ({
      ':root': {
        fontSize: '14px',
      },

      [`@media (min-width: ${properties.theme.breakpoints[5] as string})`]: {
        ':root': {
          fontSize: '16px',
        },
      },
    }),
  },

  components: {
    Button,
    Skeleton,
    Tooltip,
    FormLabel,
    Input,
    Popover,
    Textarea,
    Menu,
    Modal,
    Alert,
    Avatar,
    Editable,
    Tabs,
    Drawer,
  },

  fonts: {
    body: [tokens.fonts.base, tokens.fonts.fallback].join(','),
    heading: [tokens.fonts.base, tokens.fonts.fallback].join(','),
  },

  shadows: {
    xs: '0 0 56px rgba(29, 26, 152, 0.03)',
    sm: '0 3px 10px rgba(0, 0, 0, 0.05)',
    md: '0 5px 30px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    none: 'none',
    'dark-lg':
      'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px',
  },

  sizes: {
    xs: '16rem',
    sm: '20rem',
    md: '24rem',
    lg: '28rem',
    xl: '32rem',
    '2xl': '36rem',
  },

  fontSizes: {
    '2xs': '0.625rem',
  },
})

export default theme
