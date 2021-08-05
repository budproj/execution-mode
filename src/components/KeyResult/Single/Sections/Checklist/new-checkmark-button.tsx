import { useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PlusOutline } from 'src/components/Icon'

import messages from './messages'
import queries from './queries.gql'

interface NewCheckMarkProperties {
  keyResultID?: string
  refresh: () => void
}

export const NewCheckMark = ({ refresh, keyResultID }: NewCheckMarkProperties) => {
  const intl = useIntl()
  const [createCheckMark, { loading }] = useMutation(queries.CREATE_CHECK_MARK, {
    variables: {
      keyResultID,
      description: intl.formatMessage(messages.draftCheckMarkDescription),
    },
  })

  const handleNewCheckMark = async () => {
    await createCheckMark()
    refresh()
  }

  return (
    <Button
      variant="text"
      pl={0}
      colorScheme="brand"
      isDisabled={loading}
      leftIcon={
        <PlusOutline
          desc={intl.formatMessage(messages.newCheckMarkButtonIconDescription)}
          stroke="currentColor"
          fill="currentColor"
          fontSize="xl"
        />
      }
      onClick={handleNewCheckMark}
    >
      {intl.formatMessage(messages.newCheckMarkButtonLabel)}
    </Button>
  )
}
