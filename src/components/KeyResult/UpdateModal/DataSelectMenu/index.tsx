import { Heading, MenuItemOption } from '@chakra-ui/react'
import React from 'react'

import { SelectMenu } from 'src/components/Base'

interface DataSelectMenuProperties {
  value: string
  options: Map<string, string>
  onChange?: (newFormat: string) => void
}

export const DataSelectMenu = ({ value, options, onChange }: DataSelectMenuProperties) => {
  const currentOption = options.get(value)
  const handleChange = (newFormat: string | string[]) => {
    if (Array.isArray(newFormat)) throw new Error('Cannot parse string array')
    if (onChange) onChange(newFormat as any)
  }

  return (
    <SelectMenu
      matchWidth
      height="30px"
      fontSize="md"
      placeholder={currentOption ?? ''}
      value={value}
      onChange={handleChange}
    >
      {[...options].map(([key, value]) => (
        <MenuItemOption key={key} value={key}>
          <Heading as="h4" fontSize="md" fontWeight={400} color="black.900">
            {value}
          </Heading>
        </MenuItemOption>
      ))}
    </SelectMenu>
  )
}
