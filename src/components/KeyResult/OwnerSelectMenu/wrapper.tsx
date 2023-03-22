import { Box, MenuProps } from '@chakra-ui/react'
import React, { useState } from 'react'

import { NameWithAvatar } from 'src/components/User/NamedAvatar/name-with-avatar'
import { useGetUserDetails } from 'src/components/User/hooks'

import SelectMenu from '../../Base/SelectMenu'
import { AllReachableUsers } from '../../User/AllReachableUsers/wrapper'
import { NamedAvatarSubtitleType } from '../../User/NamedAvatar/types'

interface KeyResultOwnerSelectMenuProperties {
  value: string
  onChange?: (newOwnerID: string) => void
  avatarSubtitleType?: NamedAvatarSubtitleType
  placement?: MenuProps['placement']
  isLazy?: boolean
}

export const KeyResultOwnerSelectMenu = ({
  value,
  onChange,
  avatarSubtitleType,
  placement,
  ...rest
}: KeyResultOwnerSelectMenuProperties) => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: user, loading } = useGetUserDetails(value)

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
      scroolable={false}
      value={value}
      placement={placement}
      placeholder={
        <Box>
          <NameWithAvatar
            isLoaded={!loading}
            user={user}
            avatarSize={9}
            displaySubtitle={false}
            horizontalGap={2}
            nameColor="gray.500"
          />
        </Box>
      }
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
      {...rest}
    >
      <Box p={4} maxH="full" h="full">
        <AllReachableUsers avatarSubtitleType={avatarSubtitleType} onSelect={handleChange} />
      </Box>
    </SelectMenu>
  )
}
