import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { KeyResultCheckMark } from 'src/components/KeyResult/types'

interface KeyResultChecklistProperties {
  nodes: KeyResultCheckMark[]
}

export const KeyResultChecklist = ({ nodes }: KeyResultChecklistProperties) => (
  <Stack>
    {nodes.map(({ id }) => (
      <p key={id}>{id}</p>
    ))}
  </Stack>
)
