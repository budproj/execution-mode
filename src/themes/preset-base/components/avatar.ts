const Avatar = {
  baseStyle: {
    container: {
      bg: 'brand.100',
      color: 'brand.500',
    },
  },

  variants: {
    square: {
      container: {
        borderRadius: 4,

        '& img': {
          borderRadius: 4,
        },
      },
    },
  },
}

export default Avatar
