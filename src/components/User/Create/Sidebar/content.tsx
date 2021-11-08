import { DrawerBody, DrawerContent } from '@chakra-ui/modal'
import React from 'react'

import { CreateUserForm } from '../Form'

import { CreateUserSidebarHeader } from './header'

type CreateUserSidebarContentProperties = {
  teamID?: string
  onClose: () => void
}

export const CreateUserSidebarContent = ({
  teamID,
  onClose,
}: CreateUserSidebarContentProperties) => (
  <DrawerContent>
    <CreateUserSidebarHeader />
    <DrawerBody py={6}>
      <CreateUserForm teamID={teamID} onCancel={onClose} onSubmit={onClose} />
    </DrawerBody>
  </DrawerContent>
)
