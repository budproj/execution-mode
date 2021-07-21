const Menu = {
  baseStyle: {
    list: {
      borderWidth: 0,
      p: 0,
    },

    item: {
      p: 4,
      borderBottomWidth: 1,
      borderColor: 'gray.50',

      '& span:first-child svg': {
        color: 'new-gray.800',
      },

      _focus: {
        bg: 'black.50',
      },
    },
  },

  variants: {
    'action-list': {
      list: {
        p: 3,
        boxShadow: 'with-stroke.light',
        borderColor: 'new-gray.200',
        borderWidth: 1,
      },

      item: {
        p: 2,
        borderRadius: 4,
        borderColor: 'transparent',
        color: 'gray.300',
        transition: 'all 0.2s ease-in-out',
        _hover: {
          bg: 'gray.50',
          color: 'gray.500',
        },
        _focus: {
          bg: 'gray.50',
          color: 'gray.500',
        },
      },
    },
  },
}

export default Menu
