import { Stack, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'

import { Task } from 'src/services/new-task-management/@types/task.type'
import { TaskSummary } from 'src/services/okr/key-result/@types'

import { CreateTaskButton } from './ActionButtons/create-task-in-kr'
import { InlineTaskList } from './inline-tasklist'

const StyledStack = styled(Stack)`
  & .editable-input-value__edit-button {
    transform: translateY(6px);
  }
`

interface KeyResultChecklistProperties {
  keyResultID?: string
  nodes: TaskSummary[] | Task[]
  onUpdate?: () => void
  canCreate: boolean
  isEditable?: boolean
  wrapperProps?: StyleProps
  createTaskLabel?: string
  teamId?: string
  canUpdateOwner?: boolean
}

export const KeyResultChecklist = ({
  nodes,
  onUpdate,
  keyResultID,
  canCreate = false,
  isEditable = true,
  wrapperProps,
  createTaskLabel,
  teamId,
  canUpdateOwner = true,
}: KeyResultChecklistProperties) => {
  const createButtonReference = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    console.log('valor do time no checklist', teamId)
  }, [teamId])

  return (
    <>
      {nodes.length > 0 && (
        <StyledStack alignItems="flex-start" pt={4} {...wrapperProps}>
          {nodes.map((node) => (
            <InlineTaskList
              key={node.id}
              node={node}
              isEditable={isEditable}
              canUpdateOwner={canUpdateOwner}
              onUpdate={onUpdate}
            />
          ))}
        </StyledStack>
      )}

      {canCreate && teamId && (
        <CreateTaskButton
          mt={5}
          keyResultID={keyResultID}
          createButtonReference={createButtonReference}
          label={createTaskLabel}
          teamId={teamId}
          onCreate={onUpdate}
        />
      )}
    </>
  )
}
