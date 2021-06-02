import { Box } from '@chakra-ui/layout'
import React from 'react'

import SelectMenu from '../../Base/SelectMenu'
import { NamedAvatar } from '../../User'
import { AllReachableUsers } from '../../User/AllReachableUsers/wrapper'
import { NamedAvatarSubtitleType } from '../../User/NamedAvatar/types'

interface KeyResultOwnerSelectMenuProperties {
  value: string
  onChange?: (newOwnerID: string) => void
  avatarSubtitleType?: NamedAvatarSubtitleType
}

export const KeyResultOwnerSelectMenu = ({
  value,
  onChange,
  avatarSubtitleType,
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
        <AllReachableUsers avatarSubtitleType={avatarSubtitleType} onSelect={handleChange} />
      </Box>
    </SelectMenu>
  )
}
