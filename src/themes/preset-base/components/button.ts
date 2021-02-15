import { ButtonProps } from '@chakra-ui/react'

const Button = {
  variants: {
    text: ({ colorScheme }: ButtonProps) => ({
      '&:hover': {
        color: `${colorScheme ?? 'brand'}.500`,
      },

      '&:focus': {
        color: `${colorScheme ?? 'brand'}.500`,
        boxShadow: 'none',
      },
    }),

    solid: ({ colorScheme }: ButtonProps) => ({
      bg: `${colorScheme ?? 'brand'}.100`,
      color: `${colorScheme ?? 'brand'}.500`,
      borderRadius: '2px',

      '&:hover': {
        bg: `${colorScheme ?? 'brand'}.500`,
        color: 'white',
      },

      '&:focus': {
        bg: `${colorScheme ?? 'brand'}.100`,
        color: `${colorScheme ?? 'brand'}.500`,
        boxShadow: 'none',
      },

      '&:active': {
        bg: `${colorScheme ?? 'brand'}.100`,
        color: `${colorScheme ?? 'brand'}.500`,
      },
    }),

    outline: () => ({
      borderColor: 'brand.500',
      color: 'brand.500',
      borderWidth: '2px',
      borderRadius: '2px',

      '&:hover': {
        borderColor: 'brand.400',
        color: 'brand.400',
        bg: 'transparent',
      },

      '&:focus': {
        borderColor: 'brand.400',
        color: 'brand.400',
      },

      '&:active': {
        borderColor: 'brand.400',
        color: 'brand.400',
      },
    }),
  },

  defaultProps: {
    variant: 'text',
  },
}

export default Button
