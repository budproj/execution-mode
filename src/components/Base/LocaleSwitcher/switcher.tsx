import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import React from 'react'

export type Locale = {
  code: string
  label: string
}

type SwitcherProperties = {
  locales?: Locale[]
  currentLocale?: Locale
  isLoading?: boolean
  onSwitch: (locale: string) => void
}

export const Switcher = ({ locales, currentLocale, onSwitch, isLoading }: SwitcherProperties) => {
  locales ??= []
  currentLocale ??= locales[0]

  return (
    <Menu>
      <MenuButton
        isLoading={isLoading}
        as={Button}
        fontSize="lg"
        fontWeight={400}
        px={0}
        maxW="xs"
        textAlign="left"
        _hover={{
          opacity: 1,
          color: 'brand.500',
        }}
      >
        {currentLocale.label}
      </MenuButton>
      <MenuList boxShadow="with-stroke.dark" borderWidth={1} borderColor="new-gray.200">
        <MenuOptionGroup value={currentLocale.code} type="radio">
          {locales.map((locale) => (
            <MenuItemOption
              key={locale.code}
              value={locale.code}
              onClick={() => onSwitch(locale.code)}
            >
              {locale.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
