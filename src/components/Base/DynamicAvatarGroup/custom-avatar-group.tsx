import {
  Avatar,
  AvatarBadge,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import React, { useState } from 'react'

import CrownIcon from 'src/components/Icon/Crown'
import { SelectUserfromList } from 'src/components/User/SelectFromList'
import { User } from 'src/components/User/types'

interface CustomAvatarGroupProperties {
  max?: number
  users?: User[]
  onSelectUser?: (userId: string) => void
  selectedUserId?: string
  teamOwnerId?: string
}

const CustomAvatarGroup = ({
  max = 2,
  users,
  selectedUserId,
  teamOwnerId,
  onSelectUser,
}: CustomAvatarGroupProperties) => {
  const iterableUsers = users?.slice(0, max + 1)
  const excess = users?.length ? users.length - max : 0
  const [showMore, setShowMore] = useState(false)
  const restOfUsers = users?.slice(max)

  const handleSelectUser = (userId: string) => {
    if (onSelectUser) onSelectUser(userId)
  }

  const targetUser = selectedUserId ?? teamOwnerId

  const handleClose = () => {
    if (showMore) setShowMore(false)
  }

  const handleChange = (newOwnerID: string) => {
    if (Array.isArray(newOwnerID)) throw new Error('Cannot parse string array')
    if (onSelectUser) onSelectUser(newOwnerID)
    handleClose()
  }

  return (
    <Box position="relative" zIndex={2}>
      <HStack position="relative" pb={12} alignItems="center" justifyContent="center">
        {iterableUsers
          ?.sort((a, b) => (a.id === targetUser ? -1 : b.id === targetUser ? 1 : 0)) // Put the owner or selected user always first
          ?.map((user, index) => {
            return index < max ? (
              <Avatar
                key={
                  user.id ?? `DYNAMIC_AVATAR_${user.fullName ?? user.firstName ?? 'USER'}_${index}`
                }
                cursor="pointer"
                size="md"
                name={user.fullName ?? user.firstName}
                src={user.picture}
                position="absolute"
                zIndex={1000 - index}
                left={`calc(${index} * 33px)`}
                bottom={0}
                boxShadow={index === iterableUsers.length - 1 ? 'none' : '0 0 0 2px #fff'}
                filter={
                  'grayscale(' +
                  (selectedUserId ? (user.id === selectedUserId ? '0%' : '100%') : '0%') +
                  ')'
                }
                onClick={() => handleSelectUser(user.id ?? '')}
              >
                {teamOwnerId === user.id && (
                  <AvatarBadge placement="bottom-start" border="none">
                    <CrownIcon width="20px" height="20px" desc="" fill="yellow.500" />
                  </AvatarBadge>
                )}
              </Avatar>
            ) : (
              <Menu isLazy placement="auto-start">
                <MenuButton
                  w={12}
                  h={12}
                  fontSize={14}
                  borderRadius="50%"
                  bg="new-gray.600"
                  color="#000000"
                  bottom={0}
                  position="absolute"
                  left={`calc(${index} * 33px)`}
                  fontWeight="bold"
                  boxShadow="0 0 0 2px #fff"
                  letterSpacing="1px"
                >
                  +{excess}
                </MenuButton>
                <MenuList boxShadow="1px 1px 25px 3px rgba(0, 0, 0, 0.2)">
                  <MenuOptionGroup>
                    {restOfUsers && (
                      <Box p={4} maxH="full" h="full">
                        <SelectUserfromList
                          users={restOfUsers}
                          isLoading={!users}
                          onSelect={handleChange}
                        />
                      </Box>
                    )}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            )
          })}
      </HStack>
    </Box>
  )
}

export default CustomAvatarGroup
