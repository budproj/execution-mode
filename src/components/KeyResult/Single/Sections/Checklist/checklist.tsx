import { Stack, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'

import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import { CreateCheckMarkButton } from './ActionButtons/create-checkmark'
import { InlineTaskList } from './inline-tasklist'
import { NewTask } from 'src/components/Task/types'
import { CreateTaskButton } from './ActionButtons/create-task-in-kr'

const StyledStack = styled(Stack)`
  & .editable-input-value__edit-button {
    transform: translateY(6px);
  }
`

interface KeyResultChecklistProperties {
  keyResultID?: string
  nodes: NewTask[]
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
  canCreate = false,
  isEditable = true,
  wrapperProps,
  checkPolicy = true,
  createTaskLabel,
}: KeyResultChecklistProperties) => {
  const draftCheckMarks = useRecoilValue(draftCheckMarksAtom(keyResultID))
  const createButtonReference = useRef<HTMLButtonElement>(null)

  const canUserEdit = (node: NewTask) =>
    isEditable

  const handleCreateCheckmark = () => {
    createButtonReference.current?.click()
  }
  return (
    <>
      {nodes.length > 0 && (
        <StyledStack alignItems="flex-start" pt={4} {...wrapperProps}>
          {nodes.map((node, index) => (
            <InlineTaskList
              key={node.id}
              keyResultID={keyResultID}
              node={node}
              onUpdate={onUpdate}
              isEditable={isEditable && canUserEdit(node)}
              checkPolicy={checkPolicy}
            />
          ))}
        </StyledStack>
      )}

      {canCreate && (
        <CreateTaskButton
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
