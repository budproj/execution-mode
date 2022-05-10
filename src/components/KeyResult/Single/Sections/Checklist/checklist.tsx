import { Stack, StyleProps } from '@chakra-ui/react'
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
  wrapperProps?: StyleProps
  checkPolicy?: boolean
  createTaskLabel?: string
}

export const KeyResultChecklist = ({
  nodes,
  onUpdate,
  keyResultID,
  canCreate,
  isEditable = true,
  wrapperProps,
  checkPolicy = true,
  createTaskLabel,
}: KeyResultChecklistProperties) => {
  const draftCheckMarks = useRecoilValue(draftCheckMarksAtom(keyResultID))
  const createButtonReference = useRef<HTMLButtonElement>(null)

  const canUserEdit = (node: KeyResultCheckMarkType) =>
    isEditable && node.policy?.update === GraphQLEffect.ALLOW

  const handleCreateCheckmark = () => {
    createButtonReference.current?.click()
  }

  return (
    <>
      {nodes.length > 0 && (
        <StyledStack alignItems="flex-start" pt={4} {...wrapperProps}>
          {nodes.map((node, index) => (
            <KeyResultCheckMark
              key={node.id}
              isEditable={isEditable && canUserEdit(node)}
              node={node}
              keyResultID={keyResultID}
              draftCheckMarks={draftCheckMarks}
              index={index}
              checklistLength={nodes.length}
              checkPolicy={checkPolicy}
              onUpdate={onUpdate}
              onCreate={handleCreateCheckmark}
            />
          ))}
        </StyledStack>
      )}

      {canCreate && (
        <CreateCheckMarkButton
          mt={5}
          keyResultID={keyResultID}
          createButtonReference={createButtonReference}
          label={createTaskLabel}
          onCreate={onUpdate}
        />
      )}
    </>
  )
}
