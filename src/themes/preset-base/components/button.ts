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
  },

  defaultProps: {
    variant: 'text',
  },
}

export default Button
