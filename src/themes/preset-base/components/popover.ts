import tooltipTheme from './tooltip'

const Popover = {
  baseStyle: {
    content: {
      boxShadow: 'md',
      border: 'none',
      p: 4,
      borderRadius: 4,
      '&:focus:not([data-focus-visible-added])': {
        boxShadow: 'md',
      },
    },
  },

  variants: {
    'rich-tooltip': {
      popper: {
        maxW: tooltipTheme.baseStyle.maxW,
      },
    },
  },
}

export default Popover
