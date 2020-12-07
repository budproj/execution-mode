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
}

export default Popover
