import { AlertProps } from '@chakra-ui/react'

const Alert = {
  baseStyle: {
    container: {
      p: 4,
    },
  },

  variants: {
    outline: (properties: AlertProps) => ({
      container: {
        bg: properties.colorScheme ? `${properties.colorScheme}.50` : 'brand.50',
        borderColor: properties.colorScheme ? `${properties.colorScheme}.200` : 'brand.200',
        borderWidth: 1,
        borderRadius: 4,
      },
    }),
  },
}

export default Alert
