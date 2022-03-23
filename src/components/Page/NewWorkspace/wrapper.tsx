import { Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import CreateForm from '../../Workspace/CreateForm'

import messages from './messages'

export const NewWorkspacePage = () => {
  const intl = useIntl()

  return (
    <Stack pt={8} justifyContent="center" alignItems="center" w="60%" spacing={8}>
      <Heading>{intl.formatMessage(messages.pageTitle)}</Heading>
      <CreateForm />
    </Stack>
  )
}
