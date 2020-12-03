import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Close as CloseIcon } from 'src/components/Icons'
import { KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

export interface KeyResultDrawerProperties extends Partial<DrawerProps> {
  keyResultID?: KeyResult['id']
  isOpen: boolean
  onClose: () => void
}

const KeyResultDrawer = ({ keyResultID, ...rest }: KeyResultDrawerProperties) => {
  const intl = useIntl()

  return (
    <Drawer {...rest}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton color="gray.300" _hover={{ bg: 'transparent', color: 'brand.400' }}>
            <CloseIcon
              title={intl.formatMessage(messages.closeIconTitle)}
              desc={intl.formatMessage(messages.closeIconDesc)}
              fill="currentColor"
            />
          </DrawerCloseButton>
          {keyResultID}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

KeyResultDrawer.defaultProps = {
  placement: 'right',
}

export default KeyResultDrawer
