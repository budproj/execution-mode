import { Stack, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef } from 'react'

import { NewTask } from 'src/components/Task/types'

import { CreateTaskButton } from './ActionButtons/create-task-in-kr'
import { InlineTaskList } from './inline-tasklist'

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
  createTaskLabel?: string
}

export const KeyResultChecklist = ({
  nodes,
  onUpdate,
  keyResultID,
  canCreate = false,
  isEditable = true,
  wrapperProps,
  createTaskLabel,
}: KeyResultChecklistProperties) => {
  const createButtonReference = useRef<HTMLButtonElement>(null)

  return (
    <>
      {nodes.length > 0 && (
        <StyledStack alignItems="flex-start" pt={4} {...wrapperProps}>
          {nodes.map((node) => (
            <InlineTaskList
              key={node.id}
              keyResultID={keyResultID}
              node={node}
              isEditable={isEditable}
              onUpdate={onUpdate}
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
