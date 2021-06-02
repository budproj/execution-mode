import { Text } from '@chakra-ui/layout'
import { Heading, MenuItemOption } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import SelectMenu from '../../Base/SelectMenu'
import { KEY_RESULT_FORMAT } from '../constants'

import { DEFAULT_FORMAT_OPTIONS } from './constants'
import { FormatDetails } from './types'

interface KeyResultFormatSelectMenuProperties {
  value: KEY_RESULT_FORMAT
  options?: Record<KEY_RESULT_FORMAT, FormatDetails>
  onChange?: (newFormat: KEY_RESULT_FORMAT) => void
}

export const KeyResultFormatSelectMenu = ({
  value,
  options,
  onChange,
}: KeyResultFormatSelectMenuProperties) => {
  options ??= DEFAULT_FORMAT_OPTIONS

  const intl = useIntl()

  const currentOption = options[value]
  const handleChange = (newFormat: string | string[]) => {
    if (Array.isArray(newFormat)) throw new Error('Cannot parse string array')
    if (onChange) onChange(newFormat as any)
  }

  return (
    <SelectMenu
      matchWidth
      placeholder={intl.formatMessage(currentOption.title)}
      value={value}
      onChange={handleChange}
    >
      {Object.entries(options).map(([value, details]) => (
        <MenuItemOption key={value} value={value}>
          <Heading as="h4" fontSize="md" fontWeight={400} color="black.900">
            {intl.formatMessage(details.title)}
          </Heading>
          <Text fontSize="sm" color="gray.400">
            {intl.formatMessage(details.example)}
          </Text>
        </MenuItemOption>
      ))}
    </SelectMenu>
  )
}
