import { Button as ChakraButton, StyleProps } from '@chakra-ui/react'
import React from 'react'

import { PlusOutline } from 'src/components/Icon'

export enum BUTTON_ICON_OPTIONS {
  PLUS_OUTLINE = 'plus-outline',
}

interface ButtonProperties extends StyleProps {
  label: string
  icon?: BUTTON_ICON_OPTIONS
  iconDescription?: string
  isDisabled?: boolean
  onClick?: () => void
}

export const Button = ({ label, icon, iconDescription, ...rest }: ButtonProperties) => {
  const iconOptions = new Map([['plus-outline', PlusOutline]])
  const IconElement = icon ? iconOptions.get(icon) : undefined

  return (
    <ChakraButton
      variant="text"
      p={0}
      // H="auto"
      colorScheme="brand"
      leftIcon={
        IconElement && (
          <IconElement
            desc={iconDescription ?? label}
            stroke="currentColor"
            fill="currentColor"
            fontSize="xl"
          />
        )
      }
      {...rest}
    >
      {label}
    </ChakraButton>
  )
}
