import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'

interface KeyResultChecklistWrapperProperties {
  keyResultID?: string
  isLoading?: boolean
}

export const KeyResultChecklistWrapper = ({
  keyResultID,
  isLoading,
}: KeyResultChecklistWrapperProperties) => {
  const intl = useIntl()

  return (
    <Stack>
      <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>
    </Stack>
  )
}
