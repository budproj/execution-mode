import { Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultCheckMark as KeyResultCheckMarkType } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import { CreateCheckMarkButton } from './ActionButtons/create-checkmark'
import { KeyResultCheckMark } from './check-mark'

const StyledStack = styled(Stack)`
  & .editable-input-value__edit-button {
    transform: translateY(6px);
  }
`

interface KeyResultChecklistProperties {
  keyResultID?: string
  nodes: KeyResultCheckMarkType[]
  onUpdate?: () => void
  canCreate: boolean
  isEditable?: boolean
}

export const KeyResultChecklist = ({
  nodes,
  onUpdate,
  keyResultID,
  canCreate,
  isEditable = true,
}: KeyResultChecklistProperties) => {
  const draftCheckMarks = useRecoilValue(draftCheckMarksAtom(keyResultID))
  const createButtonReference = useRef<HTMLButtonElement>(null)

  const canUserEdit = (node: KeyResultCheckMarkType) =>
    isEditable && node.policy?.update === GraphQLEffect.ALLOW

  const handleCreateCheckmark = () => {
    createButtonReference.current?.click()
  }

  return nodes.length > 0 ? (
    <StyledStack alignItems="flex-start" pt={4}>
      {nodes.map((node, index) => (
        <KeyResultCheckMark
          key={node.id}
          isEditable={isEditable && canUserEdit(node)}
          node={node}
          keyResultID={keyResultID}
          draftCheckMarks={draftCheckMarks}
          index={index}
          checklistLength={nodes.length}
          onUpdate={onUpdate}
          onCreate={handleCreateCheckmark}
        />
      ))}
      {canCreate && nodes.length > 0 && (
        <CreateCheckMarkButton
          keyResultID={keyResultID}
          createButtonReference={createButtonReference}
          onCreate={onUpdate}
        />
      )}
    </StyledStack>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
