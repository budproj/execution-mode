import { DrawerContent, Drawer, DrawerOverlay, DrawerProps } from '@chakra-ui/react'
import React from 'react'

import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultDrawerHeader from './Header'

export interface KeyResultDrawerProperties extends Partial<DrawerProps> {
  keyResultID?: KeyResult['id']
  isOpen: boolean
  onClose: () => void
}

const KeyResultDrawer = ({ keyResultID, ...rest }: KeyResultDrawerProperties) => (
  <Drawer {...rest}>
    <DrawerOverlay>
      <DrawerContent>
        <KeyResultDrawerHeader keyResultID={keyResultID} />
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
)

KeyResultDrawer.defaultProps = {
  placement: 'right',
  size: 'sm',
}

export default KeyResultDrawer
