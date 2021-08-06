import { Stack } from '@chakra-ui/layout'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import { CreateCheckMark } from './ActionButtons/create-checkmark'
import { KeyResultCheckMark } from './check-mark'

interface KeyResultChecklistProperties {
  keyResultID?: string
  nodes: KeyResultCheckMarkType[]
  refresh: () => void
  canCreate: boolean
}

export const KeyResultChecklist = ({
  nodes,
  refresh,
  keyResultID,
  canCreate,
}: KeyResultChecklistProperties) => {
  const draftCheckMarks = useRecoilValue(draftCheckMarksAtom(keyResultID))

  return nodes.length > 0 ? (
    <Stack alignItems="flex-start">
      {nodes.map((node) => (
        <KeyResultCheckMark
          key={node.id}
          node={node}
          refresh={refresh}
          draftCheckMarks={draftCheckMarks}
        />
      ))}
      {canCreate && nodes.length > 0 && (
        <CreateCheckMark refresh={refresh} keyResultID={keyResultID} />
      )}
    </Stack>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
