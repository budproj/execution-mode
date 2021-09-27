const Input = {
  variants: {
    outline: () => ({
      field: {
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'new-gray.400',
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
        bg: 'new-gray.200',
        color: 'new-gray.600',
      },
    },
  },
}

export default Input
