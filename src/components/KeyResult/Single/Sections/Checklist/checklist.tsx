import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PlusOutline } from 'src/components/Icon'
import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'

import { KeyResultCheckMark } from './check-mark'
import messages from './messages'
import queries from './queries.gql'

interface KeyResultChecklistProperties {
  keyResultID?: string
  nodes: KeyResultCheckMarkType[]
  refresh: () => void
}

export const KeyResultChecklist = ({
  nodes,
  refresh,
  keyResultID,
}: KeyResultChecklistProperties) => {
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
    <Stack alignItems="flex-start">
      {nodes.map((node) => (
        <KeyResultCheckMark key={node.id} node={node} refresh={refresh} />
      ))}
      {nodes.length > 0 && (
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
      )}
    </Stack>
  )
}
