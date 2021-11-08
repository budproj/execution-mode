import { Drawer } from '@chakra-ui/modal'
import React from 'react'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'

import { CreateUserSidebarContent } from './content'

type CreateUserSidebarWrapperProperties = {
  teamID?: string
  isOpen: boolean
  onClose: () => void
}

export const CreateUserSidebarWrapper = ({
  teamID,
  isOpen,
  onClose,
}: CreateUserSidebarWrapperProperties) => (
  <Drawer isOpen={isOpen} size="xl" onClose={onClose}>
    <ColorizedOverlay>
      <CreateUserSidebarContent teamID={teamID} onClose={onClose} />
    </ColorizedOverlay>
  </Drawer>
)
