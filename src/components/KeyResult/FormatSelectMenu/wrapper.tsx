import { Text } from '@chakra-ui/layout'
import { Heading, MenuItemOption } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import SelectMenu from '../../Base/SelectMenu'

import { DEFAULT_FORMAT_OPTIONS } from './constants'
import { FormatOption } from './types'

interface KeyResultFormatSelectMenuProperties {
  options?: FormatOption[]
  defaultOption?: FormatOption
}

export const KeyResultFormatSelectMenu = ({
  options,
  defaultOption,
}: KeyResultFormatSelectMenuProperties) => {
  options ??= DEFAULT_FORMAT_OPTIONS
  defaultOption ??= options[0]

  const intl = useIntl()

  const handleChange = () => {}

  return (
    <SelectMenu
      matchWidth
      placeholder={intl.formatMessage(defaultOption.title)}
      value={defaultOption.id}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MenuItemOption key={option.id} value={option.id}>
          <Heading as="h4" fontSize="md" fontWeight={400} color="black.900">
            {intl.formatMessage(option.title)}
          </Heading>
          <Text fontSize="sm" color="gray.400">
            {intl.formatMessage(option.example)}
          </Text>
        </MenuItemOption>
      ))}
    </SelectMenu>
  )
}
