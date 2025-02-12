import { Box, Flex, HStack, Skeleton, VStack, Text, Badge, Select } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import { TASK_STATUS } from 'src/services/new-task-management/new-task-management.service'

import messages from './messages'
import { useIntl } from 'react-intl'
import { DeleteCheckMarkButton } from './ActionButtons/delete-checkmark'
import { ChangeAssignedCheckMarkButton } from './ActionButtons/change-assigned'
import { EditableInputField } from 'src/components/Base'
import { DeleteTaskButton } from './ActionButtons/delete-task'

export function swap<T>(array: T[], index: number, index_: number): T[] {
  const copy = [...array]
  const temporary = copy[index]
  copy[index] = copy[index_]
  copy[index_] = temporary
  return copy
}

export const headerColumnMessage = new Map([
  [TASK_STATUS.PENDING, messages.pendingColumnHeading],
  [TASK_STATUS.TODO, messages.todoColumnHeading],
  [TASK_STATUS.DOING, messages.doingColumnHeading],
  [TASK_STATUS.DONE, messages.doneColumnHeading],
])

export const ColumnColorScheme: Record<TASK_STATUS, string> = {
  pending: 'new-gray.600',
  toDo: 'yellow.600',
  doing: 'green.500',
  done: 'brand.500',
}

export interface NewTask {
  id: string
  key_result?: string | undefined
  orderindex: number
  status: TASK_STATUS
  title: string
  description: string
  dueDate: Date
  history?: string[]
  priority: number
  owner: string
  attachments?: string[]
  supportTeam: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  team: string
  cycle: string | null
}

interface InlineTaskListProperties {
  keyResultID?: string
  draftCheckMarks?: string[]
  node: NewTask
  onUpdate?: () => void
  index?: number
  checklistLength?: number
  onCreate?: () => void
  isEditable?: boolean
  checkPolicy?: boolean
}

const StyledKeyResultCheckMark = styled(HStack)`
  & .deleteCheckMarkButton {
    opacity: 0;
  }

  &:hover .deleteCheckMarkButton {
    opacity: 1;
  }
`

export const InlineTaskList = ({
  keyResultID,
  node,
  onUpdate,
  isEditable = true,
  checkPolicy = true,
}: InlineTaskListProperties) => {
  const isLoaded = Boolean(node)
  //const isDraft = typeof node?.id === 'undefined' ? false : draftCheckMarks?.includes(node.id)
  const intl = useIntl()
  const header = headerColumnMessage.get(node?.status ?? TASK_STATUS.PENDING)
  const removeCheckmarkButton = useRef<HTMLButtonElement>(null)
  const [toggleTaskStatus, setToggleTaskStatus] = useState(false)
  const [headerText, setHeaderText] = useState(header)
  const [newNode, setNode] = useState(node);
  function handleOpenSelectTaskStatus() {
    if (!toggleTaskStatus) {
      setToggleTaskStatus(true)
    }
  }
  
  function handleSetNewTaskStatus(status: string) {
    setToggleTaskStatus(false)
    setNode({...node, status: TASK_STATUS[status.toUpperCase() as keyof typeof TASK_STATUS] })
    setHeaderText(headerColumnMessage.get(TASK_STATUS[status.toUpperCase() as keyof typeof TASK_STATUS]))
  }
  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <StyledKeyResultCheckMark alignItems="center">
        <Box py={1}>
          {toggleTaskStatus ? (
            <Select
              value={newNode?.status}
              width={'36'}
              onChange={(e) => {
                handleSetNewTaskStatus(e.target.value)
              }}
            >
             {Object.keys(TASK_STATUS).map((name) => {
               return (
                 <option key={name} value={name.toLocaleLowerCase()}>
                   {intl.formatMessage(headerColumnMessage.get(TASK_STATUS[name as keyof typeof TASK_STATUS]))}
                 </option>
               )
             })}
            </Select>
          ) : (
            <Badge
              py={1}
              px={3}
              borderRadius={100}
              backgroundColor={ColumnColorScheme[newNode.status ?? TASK_STATUS.PENDING]}
              color="white"
              textTransform="uppercase"
              cursor={'pointer'}
              onClick={handleOpenSelectTaskStatus}
            >
              {headerText && intl.formatMessage(headerText)}
            </Badge>
          )}
        </Box>
        <VStack marginLeft={0} spacing={2} align="stretch" w="full">

          <Text fontSize="sm" color="gray.500" lineHeight="0.7rem">
            {newNode?.title}
          </Text>
          <Text fontSize="sm" color="new-gray.600" lineHeight="0.7rem">
            David Saggioro
          </Text>
        </VStack>
        <Flex gap={2} alignItems="center">
          <DeleteTaskButton
            buttonRef={removeCheckmarkButton}
            className="deleteCheckMarkButton"
            keyResultID={keyResultID}
            taskID={newNode?.id}
            canDelete={true}
            onDelete={onUpdate}
          />
          <ChangeAssignedCheckMarkButton
            keyResultID={keyResultID}
            checkMarkId={newNode?.key_result}
            assignedUserId={'8140026c-73cd-49cb-882e-6f9157b2ad03'}
            canUpdate={true}
            //onUpdate={onUpdate}
          />
        </Flex>
      </StyledKeyResultCheckMark>
    </Skeleton>
  )
}