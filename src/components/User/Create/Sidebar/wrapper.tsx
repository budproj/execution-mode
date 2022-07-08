import { ApolloQueryResult } from '@apollo/client'
import { Drawer } from '@chakra-ui/react'
import React from 'react'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'

import { CreateUserSidebarContent } from './content'

type CreateUserSidebarWrapperProperties = {
  teamID?: string
  isOpen: boolean
  onClose: () => void
  onCreate?: (userID: string) => Promise<void> | Promise<ApolloQueryResult<any>> | void
}

export const CreateUserSidebarWrapper = ({
  teamID,
  isOpen,
  onClose,
  onCreate,
}: CreateUserSidebarWrapperProperties) => {
  const handleCreatedUser = async (userID: string) => {
    if (onCreate) void onCreate(userID)
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} size="xl" onClose={onClose}>
      <ColorizedOverlay>
        <CreateUserSidebarContent teamID={teamID} onClose={onClose} onCreate={handleCreatedUser} />
      </ColorizedOverlay>
    </Drawer>
  )
}
