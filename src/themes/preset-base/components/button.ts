import { ButtonProps } from '@chakra-ui/react'

const Button = {
  variants: {
    text: ({ isActive }: ButtonProps) => ({
      fontWeight: 500,
      color: isActive ? 'brand.600' : 'gray.700',

      '&:hover': {
        color: 'brand.600',
      },
    }),

    solid: () => ({
      bg: 'brand.500',
      color: 'white',
      width: '100%',

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
  },

  defaultProps: {
    variant: 'text',
  },
}

export default Button
