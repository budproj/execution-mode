import { PopoverProps } from '@chakra-ui/popover'

import tooltipTheme from './tooltip'

const widths: Record<string, number> = {
  sm: 52,
  default: 64,
}

const heights: Record<string, string> = {
  md: '30vh',
  default: '50vh',
}

const Popover = {
  parts: ['content', 'popper'],

  baseStyle: ({ size }: PopoverProps) => ({
    content: {
      boxShadow: 'with-stroke.light',
      border: 'none',
      p: 4,
      borderRadius: 4,
      '&:focus:not([data-focus-visible-added])': {
        boxShadow: 'with-stroke.light',
      },
    },

    popper: {
      maxW: size && size in widths ? widths[size] : widths.default,
      maxH: size && size in heights ? heights[size] : heights.default,
      borderColor: 'new-gray.200',
      borderWidth: 1,
      borderStyle: 'solid',
      boxShadow: 'with-stroke.light',
      outline: 'none',
      _focus: { boxShadow: 'with-stroke.light' },
    },
  }),

  variants: {
    'rich-tooltip': {
      popper: {
        maxW: tooltipTheme.baseStyle.maxW,
      },
    },
  },
}

export default Popover
