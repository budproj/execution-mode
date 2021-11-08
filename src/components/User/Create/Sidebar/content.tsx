import { DrawerBody, DrawerContent } from '@chakra-ui/modal'
import React from 'react'

import { CreateUserForm } from '../Form'

import { CreateUserSidebarHeader } from './header'

type CreateUserSidebarContentProperties = {
  onClose: () => void
}

export const CreateUserSidebarContent = ({ onClose }: CreateUserSidebarContentProperties) => (
  <DrawerContent>
    <CreateUserSidebarHeader />
    <DrawerBody py={6}>
      <CreateUserForm onCancel={onClose} onSubmit={onClose} />
    </DrawerBody>
  </DrawerContent>
)
