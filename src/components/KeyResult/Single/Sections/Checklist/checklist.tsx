import { Stack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PlusOutline } from 'src/components/Icon'
import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'

import { KeyResultCheckMark } from './check-mark'
import messages from './messages'

interface KeyResultChecklistProperties {
  nodes: KeyResultCheckMarkType[]
  refresh: () => void
}

export const KeyResultChecklist = ({ nodes, refresh }: KeyResultChecklistProperties) => {
  const intl = useIntl()

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
          leftIcon={
            <PlusOutline
              desc={intl.formatMessage(messages.newCheckMarkButtonIconDescription)}
              stroke="currentColor"
              fill="currentColor"
              fontSize="xl"
            />
          }
        >
          {intl.formatMessage(messages.newCheckMarkButtonLabel)}
        </Button>
      )}
    </Stack>
  )
}
