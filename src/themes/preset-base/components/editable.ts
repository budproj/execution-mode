const Editable = {
  baseStyle: {
    preview: {
      borderWidth: 2,
      borderColor: 'transparent',
      py: 1,
    },

    input: {
      borderWidth: 2,
      borderRadius: 4,
      borderColor: 'black.200',
      color: 'currentColor',
      py: 1,
      px: 2,

      _focus: {
        boxShadow: 'none',
      },
    },
  },
}

export default Editable
