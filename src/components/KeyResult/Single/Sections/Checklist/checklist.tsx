import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'

import { KeyResultCheckMark } from './check-mark'

interface KeyResultChecklistProperties {
  nodes: KeyResultCheckMarkType[]
  refresh: () => void
}

export const KeyResultChecklist = ({ nodes, refresh }: KeyResultChecklistProperties) => (
  <Stack>
    {nodes.map((node) => (
      <KeyResultCheckMark key={node.id} node={node} refresh={refresh} />
    ))}
  </Stack>
)
