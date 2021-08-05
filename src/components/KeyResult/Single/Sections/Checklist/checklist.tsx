import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'

import { KeyResultCheckMark } from './check-mark'

interface KeyResultChecklistProperties {
  nodes: KeyResultCheckMarkType[]
}

export const KeyResultChecklist = ({ nodes }: KeyResultChecklistProperties) => (
  <Stack>
    {nodes.map((checkMark) => (
      <KeyResultCheckMark key={checkMark.id} {...checkMark} />
    ))}
  </Stack>
)
