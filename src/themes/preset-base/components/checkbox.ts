export const Checkbox = {
  baseStyle: {
    control: {
      p: 3,
      borderRadius: 6,
      borderColor: 'gray.100',
      borderWidth: 1,

      '&[data-checked]': {
        bg: 'brand.500',
        borderColor: 'brand.500',

        '&[data-hover]': {
          bg: 'brand.500',
          borderColor: 'brand.500',
        },
      },
    },

    label: {
      '&[data-checked]': {
        color: 'new-gray.600',
        textDecoration: 'line-through',
      },
    },
  },
}
