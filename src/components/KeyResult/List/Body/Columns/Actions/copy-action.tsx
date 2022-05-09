import { MenuItem, useClipboard, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface CopyActionProperties {
  keyResultTitle: string
}

export const CopyAction = ({ keyResultTitle }: CopyActionProperties) => {
  const intl = useIntl()

  const { onCopy } = useClipboard(keyResultTitle)
  const toast = useToast()

  const handleCopy = () => {
    onCopy()
    toast({
      title: `${intl.formatMessage(messages.successfulCopyMessage)}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return <MenuItem onClick={handleCopy}>{intl.formatMessage(messages.copyButtonMessage)}</MenuItem>
}
