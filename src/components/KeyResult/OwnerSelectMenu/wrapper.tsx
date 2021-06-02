import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (newOwnerID: string | string[]) => {
    if (Array.isArray(newOwnerID)) throw new Error('Cannot parse string array')
    if (onChange) onChange(newOwnerID)
    handleClose()
  }

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <SelectMenu
      matchWidth
      isLazy
      closeOnSelect
      isOpen={isOpen}
      value={value}
      placeholder={
        <NamedAvatar
          userID={value}
          avatarSize={9}
          displaySubtitle={false}
          horizontalGap={2}
          nameColor="gray.500"
        />
      }
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
    >
      <Box p={4}>
        <AllReachableUsers avatarSubtitleType={avatarSubtitleType} onSelect={handleChange} />
      </Box>
    </SelectMenu>
  )
}
