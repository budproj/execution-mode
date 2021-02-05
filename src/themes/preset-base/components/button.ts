import { ButtonProps } from '@chakra-ui/react'

const Button = {
  variants: {
    text: ({ isActive }: ButtonProps) => ({
      fontWeight: 500,
      color: isActive ? 'brand.600' : 'gray.700',

      '&:hover': {
        color: 'brand.600',
      },

      '&:focus': {
        boxShadow: 'none',
      },
    }),

    solid: ({ colorScheme }: ButtonProps) => ({
      bg: `${colorScheme}.100`,
      color: `${colorScheme}.500`,
      borderRadius: '2px',

      '&:hover': {
        bg: `${colorScheme}.500`,
        color: 'white',
      },

      '&:focus': {
        bg: `${colorScheme}.100`,
        color: `${colorScheme}.500`,
      },

      '&:active': {
        bg: `${colorScheme}.100`,
        color: `${colorScheme}.500`,
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
