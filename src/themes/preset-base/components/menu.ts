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
        color: 'gray.200',
      },

      '&:focus': {
        bg: 'black.50',
      },
    },
  },
}

export default Menu
