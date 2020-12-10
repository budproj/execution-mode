import { Box, DrawerCloseButton, DrawerHeader } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Close as CloseIcon } from 'src/components/Icons'
import KeyResultSingleTitle from 'src/components/KeyResult/Single/Title'
import { KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

export interface KeyResultDrawerHeaderProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerHeader = ({ keyResultID }: KeyResultDrawerHeaderProperties) => {
  const intl = useIntl()

  return (
    <Box borderBottomWidth={1} borderColor="gray.100" pt={8} pb={4}>
      <DrawerHeader>
        <KeyResultSingleTitle keyResultID={keyResultID} />
        <DrawerCloseButton
          color="gray.300"
          _hover={{ bg: 'transparent', color: 'brand.400' }}
          fontSize="12px"
          position="absolute"
          top={21}
          right={21}
        >
          <CloseIcon
            title={intl.formatMessage(messages.closeIconTitle)}
            desc={intl.formatMessage(messages.closeIconDesc)}
            fill="currentColor"
          />
        </DrawerCloseButton>
      </DrawerHeader>
    </Box>
  )
}

export default KeyResultDrawerHeader
