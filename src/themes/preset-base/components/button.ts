import { ButtonProps } from '@chakra-ui/react'

const Button = {
  variants: {
    text: ({ colorScheme }: ButtonProps) => ({
      color: `${colorScheme ?? 'gray'}.500`,

      _hover: {
        color: `${colorScheme ?? 'brand'}.400`,
      },

      _focus: {
        boxShadow: 'none',
      },
    }),

    solid: ({ colorScheme }: ButtonProps) => ({
      bg: `${colorScheme ?? 'brand'}.500`,
      color: 'white',
      borderRadius: '4px',
      borderWidth: 2,
      borderColor: `${colorScheme ?? 'brand'}.500`,
      fontSize: 'lg',
      lineHeight: 'xl',
      py: 3,
      h: 'auto',

      _hover: {
        bg: `${colorScheme ?? 'brand'}.100`,
        borderColor: `${colorScheme ?? 'brand'}.100`,
        color: `${colorScheme ?? 'brand'}.500`,

        _disabled: {
          bg: `${colorScheme ?? 'brand'}.500`,
          borderColor: `${colorScheme ?? 'brand'}.500`,
          color: `${colorScheme ?? 'brand'}.500`,
        },
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
      fontSize: 'lg',
      lineHeight: 'xl',
      py: 3,
      h: 'auto',

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
      borderColor: `${colorScheme ?? 'brand'}.500`,
      borderWidth: 2,
      borderRadius: 4,
      py: 3,
      h: 'auto',
      fontSize: 'lg',
      lineHeight: 'xl',

      _hover: {
        borderColor: `${colorScheme ?? 'brand'}.400`,
        bg: `${colorScheme ?? 'brand'}.500`,
        color: 'white',
      },

      _focus: {
        borderColor: `${colorScheme ?? 'brand'}.400`,
        bg: `${colorScheme ?? 'brand'}.500`,
        color: 'white',
        boxShadow: 'none',
      },

      _active: {
        borderColor: `${colorScheme ?? 'brand'}.400`,
        bg: `${colorScheme ?? 'brand'}.500`,
        color: 'white',
      },
    }),
  },

  defaultProps: {
    variant: 'text',
  },
}

export default Button
