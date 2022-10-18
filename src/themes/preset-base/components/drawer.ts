const Drawer = {
  sizes: {
    lg: {
      dialog: {
        maxW: 'xl',
      },
    },
    xl: {
      dialog: {
        maxW: '2xl',
      },
    },
  },
  variants: {
    sharedFocus: {
      parts: ['dialogContainer'],
      dialogContainer: {
        pointerEvents: 'none',
      },
    },
  },
}

export default Drawer
