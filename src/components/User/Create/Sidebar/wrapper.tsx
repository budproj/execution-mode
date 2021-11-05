import { Drawer } from '@chakra-ui/modal'
import React from 'react'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'

import { CreateUserSidebarContent } from './content'

type CreateUserSidebarWrapperProperties = {
  isOpen: boolean
  onClose: () => void
}

export const CreateUserSidebarWrapper = ({
  isOpen,
  onClose,
}: CreateUserSidebarWrapperProperties) => (
  <Drawer isOpen={isOpen} size="xl" onClose={onClose}>
    <ColorizedOverlay>
      <CreateUserSidebarContent />
    </ColorizedOverlay>
  </Drawer>
)
