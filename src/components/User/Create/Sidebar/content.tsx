import { DrawerBody, DrawerContent } from '@chakra-ui/modal'
import React from 'react'

import { CreateUserForm } from '../Form'

import { CreateUserSidebarHeader } from './header'

export const CreateUserSidebarContent = () => (
  <DrawerContent>
    <CreateUserSidebarHeader />
    <DrawerBody py={6}>
      <CreateUserForm />
    </DrawerBody>
  </DrawerContent>
)
