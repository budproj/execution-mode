import { Stack } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'

import { KeyResultCheckMark } from './check-mark'
import { NewCheckMark } from './new-checkmark-button'

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

  return (
    <Stack alignItems="flex-start">
      {nodes.map((node) => (
        <KeyResultCheckMark key={node.id} node={node} refresh={refresh} />
      ))}
      {nodes.length > 0 && <NewCheckMark refresh={refresh} keyResultID={keyResultID} />}
    </Stack>
  )
}
