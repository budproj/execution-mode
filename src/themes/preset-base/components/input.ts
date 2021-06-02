const Input = {
  variants: {
    outline: () => ({
      field: {
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'gray.100',
        color: 'gray.500',
        fontWeight: 400,
        fontSize: 'lg',
        py: 6,
        px: 3,
      },
    }),

    solid: {
      field: {
        borderWidth: 0,
        bg: 'black.50',
        color: 'black.600',
      },
    },
  },
}

export default Input
