const Tabs = {
  variants: {
    line: {
      tablist: {
        borderColor: 'black.100',
      },

      tab: {
        fontWeight: 500,
        color: 'gray.400',

        _selected: {
          color: 'gray.500',
          borderColor: 'blue.500',
        },

        _focus: {
          boxShadow: 'none',
        },

        _active: {
          color: 'blue.500',
          background: 'transparent',
        },

        _hover: {
          color: 'blue.500',
        },
      },

      tabpanel: {
        pt: 8,
      },
    },
  },
}

export default Tabs
