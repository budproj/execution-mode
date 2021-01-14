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

    solid: () => ({
      bg: 'brand.500',
      color: 'white',
      borderRadius: '2px',

      '&:hover': {
        bg: 'brand.400',
      },

      '&:focus': {
        bg: 'brand.400',
      },

      '&:active': {
        bg: 'brand.400',
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
