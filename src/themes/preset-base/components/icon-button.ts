import { IconButtonProps } from '@chakra-ui/react'

const IconButton = {
  variants: {
    solid: ({ colorScheme }: IconButtonProps) => ({
      bg: `${colorScheme ?? 'brand'}.100`,
      color: `${colorScheme ?? 'brand'}.500`,
      borderRadius: '2px',

      _hover: {
        bg: `${colorScheme ?? 'brand'}.500`,
        color: 'white',

        _disabled: {
          bg: `${colorScheme ?? 'brand'}.100`,
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
  },

  defaultProps: {
    variant: 'solid',
  },
}

export default IconButton
