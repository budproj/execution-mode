const Input = {
  variants: {
    outline: () => ({
      field: {
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'black.200',
        color: 'gray.400',
        fontWeight: 500,
      },
    }),

    solid: {
      field: {
        borderWidth: 0,
        bg: 'black.50',
        color: 'black.600',
        p: 4,
      },
    },
  },
}

export default Input
