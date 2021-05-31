import { Box } from '@chakra-ui/layout'
import React from 'react'

import SelectMenu from '../../Base/SelectMenu'
import { NamedAvatar } from '../../User'
import { AllReachableUsers } from '../../User/AllReachableUsers/wrapper'

interface KeyResultOwnerSelectMenuProperties {
  value: string
  onChange?: (newOwnerID: string) => void
}

export const KeyResultOwnerSelectMenu = ({
  value,
  onChange,
}: KeyResultOwnerSelectMenuProperties) => {
  const handleChange = (newOwnerID: string | string[]) => {
    if (Array.isArray(newOwnerID)) throw new Error('Cannot parse string array')
    if (onChange) onChange(newOwnerID)
  }

  return (
    <SelectMenu
      matchWidth
      isLazy
      placeholder={
        <NamedAvatar
          userID={value}
          avatarSize={9}
          displaySubtitle={false}
          horizontalGap={2}
          nameColor="gray.500"
        />
      }
      value={value}
      onChange={handleChange}
    >
      <Box p={4}>
        <AllReachableUsers onSelect={handleChange} />
      </Box>
    </SelectMenu>
  )
}
