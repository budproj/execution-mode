import { ApolloQueryResult } from '@apollo/client'
import { Drawer, DrawerBody, DrawerContent } from '@chakra-ui/react'
import React from 'react'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'
import { UserProfile } from 'src/components/User/Profile/wrapper'
import { User } from 'src/components/User/types'

interface SeeDetailsSidebarProperties {
  id?: User['id']
  isOpen: boolean
  onClose: () => void
  onUserDeactivation: () => Promise<void> | Promise<ApolloQueryResult<any>>
}

export const SeeDetailsAction = ({
  id,
  isOpen,
  onClose,
  onUserDeactivation,
}: SeeDetailsSidebarProperties) => {
  const handleDeactivateUser = async () => {
    await onUserDeactivation()
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} size="xl" onClose={onClose}>
      <ColorizedOverlay>
        <DrawerContent>
          <DrawerBody>
            {id && <UserProfile userID={id} onUserDeactivation={handleDeactivateUser} />}
          </DrawerBody>
        </DrawerContent>
      </ColorizedOverlay>
    </Drawer>
  )
}
