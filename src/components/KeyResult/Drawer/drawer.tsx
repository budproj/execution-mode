import { Drawer, DrawerContent, DrawerOverlay, DrawerProps } from '@chakra-ui/react'
import React from 'react'

import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultDrawerProperties extends Partial<DrawerProps> {
  keyResultID?: KeyResult['id']
  isOpen: boolean
  onClose: () => void
}

const KeyResultDrawer = ({ keyResultID, ...rest }: KeyResultDrawerProperties) => (
  <Drawer {...rest}>
    <DrawerOverlay>
      <DrawerContent>{keyResultID}</DrawerContent>
    </DrawerOverlay>
  </Drawer>
)

KeyResultDrawer.defaultProps = {
  placement: 'right',
}

export default KeyResultDrawer
