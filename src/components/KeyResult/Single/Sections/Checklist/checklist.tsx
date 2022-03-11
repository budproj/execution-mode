import { Stack } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import { CreateCheckMarkButton } from './ActionButtons/create-checkmark'
import { KeyResultCheckMark } from './check-mark'

interface KeyResultChecklistProperties {
  keyResultID?: string
  nodes: KeyResultCheckMarkType[]
  onCreateCheckmark?: () => void
  canCreate: boolean
}

export const KeyResultChecklist = ({
  nodes,
  onCreateCheckmark,
  keyResultID,
  canCreate,
}: KeyResultChecklistProperties) => {
  const draftCheckMarks = useRecoilValue(draftCheckMarksAtom(keyResultID))
  const createButtonReference = useRef<HTMLButtonElement>(null)

  const handleCreateCheckmark = () => {
    createButtonReference.current?.click()
  }

  return nodes.length > 0 ? (
    <Stack alignItems="flex-start" pt={4}>
      {nodes.map((node, index) => (
        <KeyResultCheckMark
          key={node.id}
          node={node}
          keyResultID={keyResultID}
          draftCheckMarks={draftCheckMarks}
          index={index}
          checklistLength={nodes.length}
          onUpdate={onCreateCheckmark}
          onCreate={handleCreateCheckmark}
        />
      ))}
      {canCreate && nodes.length > 0 && (
        <CreateCheckMarkButton
          keyResultID={keyResultID}
          createButtonReference={createButtonReference}
          onCreate={onCreateCheckmark}
        />
      )}
    </Stack>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
