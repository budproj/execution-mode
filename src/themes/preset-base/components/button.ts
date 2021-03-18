import { ButtonProps } from '@chakra-ui/react'

const Button = {
  variants: {
    text: ({ colorScheme }: ButtonProps) => ({
      color: `${colorScheme ?? 'gray'}.500`,

      _hover: {
        color: `${colorScheme ?? 'brand'}.400`,
      },

      _focus: {
        color: `${colorScheme ?? 'brand'}.400`,
        boxShadow: 'none',
      },
    }),

    solid: ({ colorScheme }: ButtonProps) => ({
      bg: `${colorScheme ?? 'brand'}.100`,
      color: `${colorScheme ?? 'brand'}.500`,
      borderRadius: '2px',

      _hover: {
        bg: `${colorScheme ?? 'brand'}.500`,
        color: 'white',
      },

      _focus: {
        boxShadow: 'none',
      },

      _active: {
        bg: `${colorScheme ?? 'brand'}.100`,
        color: `${colorScheme ?? 'brand'}.500`,
      },
    }),

    ghost: ({ colorScheme }: ButtonProps) => ({
      color: `${colorScheme ?? 'brand'}.500`,
      borderRadius: 4,

      _hover: {
        bg: `${colorScheme ?? 'brand'}.50`,
      },

      _focus: {
        boxShadow: 'none',
      },

      _active: {
        bg: `${colorScheme ?? 'brand'}.50`,
      },
    }),

    outline: ({ colorScheme }: ButtonProps) => ({
      color: `${colorScheme ?? 'brand'}.500`,
      borderColor: `${colorScheme ?? 'brand'}.100`,
      borderWidth: 2,
      borderRadius: 4,

      _hover: {
        borderColor: `${colorScheme ?? 'brand'}.400`,
        bg: 'transparent',
      },

      _focus: {
        borderColor: `${colorScheme ?? 'brand'}.400`,
        boxShadow: 'none',
      },

      _active: {
        borderColor: `${colorScheme ?? 'brand'}.400`,
        bg: 'transparent',
      },
    }),
  },

  defaultProps: {
    variant: 'text',
  },
}

export default Button
