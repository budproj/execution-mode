import { Stack } from '@chakra-ui/layout'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import { KeyResultCheckMark } from './check-mark'
import { NewCheckMark } from './new-checkmark'

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
  const draftCheckMarks = useRecoilValue(draftCheckMarksAtom(keyResultID))

  return (
    <Stack alignItems="flex-start">
      {nodes.map((node) => (
        <KeyResultCheckMark
          key={node.id}
          node={node}
          refresh={refresh}
          draftCheckMarks={draftCheckMarks}
        />
      ))}
      {nodes.length > 0 && <NewCheckMark refresh={refresh} keyResultID={keyResultID} />}
    </Stack>
  )
}
