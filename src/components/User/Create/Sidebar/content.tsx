import { DrawerBody, DrawerContent } from '@chakra-ui/modal'
import React from 'react'

import { CreateUserForm } from '../Form'

import { CreateUserSidebarHeader } from './header'

type CreateUserSidebarContentProperties = {
  teamID?: string
  onClose: () => void
  onCreate?: (userID: string) => Promise<void> | void
}

export const CreateUserSidebarContent = ({
  teamID,
  onClose,
  onCreate,
}: CreateUserSidebarContentProperties) => (
  <DrawerContent>
    <CreateUserSidebarHeader />
    <DrawerBody py={6}>
      <CreateUserForm teamID={teamID} onCancel={onClose} onCreate={onCreate} />
    </DrawerBody>
  </DrawerContent>
)
