import { PopoverProps } from '@chakra-ui/popover'

import tooltipTheme from './tooltip'

const sizes: Record<string, number> = {
  sm: 52,
  default: 64,
}

const Popover = {
  baseStyle: ({ size }: PopoverProps) => ({
    content: {
      boxShadow: 'md',
      border: 'none',
      p: 4,
      borderRadius: 4,
      '&:focus:not([data-focus-visible-added])': {
        boxShadow: 'md',
      },
    },

    popper: {
      maxW: size && size in sizes ? sizes[size as string] : sizes.default,
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
