import { Box, Flex, HStack, Skeleton, VStack, Text, Badge, Select, Avatar } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import { EditableInputField } from 'src/components/Base'
import { useUpdateTaskByKr } from 'src/components/TaskManagement/hooks/use-update-task-new'
import { NamedAvatar } from 'src/components/User'
import { TASK_STATUS } from 'src/services/new-task-management/new-task-management.service'

import { DeleteTaskButton } from './ActionButtons/delete-task'
import messages from './messages'

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
  initialDate: Date
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
  owner_full_name?: string | undefined
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
  index,
  checklistLength,
  onCreate,
  isEditable = true,
  draftCheckMarks,
}: InlineTaskListProperties) => {
  const isLoaded = Boolean(node)
  const isDraft = typeof node?.id === 'undefined' ? false : draftCheckMarks?.includes(node.id)
  const isWaiting = false
  const canUpdate = true
  const canDelete = true
  const intl = useIntl()
  const header = headerColumnMessage.get(node?.status ?? TASK_STATUS.PENDING)
  const removeCheckmarkButton = useRef<HTMLButtonElement>(null)
  const [toggleTaskStatus, setToggleTaskStatus] = useState(false)
  const [headerText, setHeaderText] = useState(header)
  const [newNode, setNode] = useState(node)
  const [isEditing, setIsEditing] = useState(false)

  const { mutateAsync: updateTask } = useUpdateTaskByKr()

  function handleOpenSelectTaskStatus() {
    if (!toggleTaskStatus) {
      setToggleTaskStatus(true)
    }
  }

  async function handleSetNewTaskStatus(status: string) {
    setToggleTaskStatus(false)

    const updatedNode = {
      ...newNode,
      status: TASK_STATUS[status.toUpperCase() as keyof typeof TASK_STATUS],
    }

    setNode(updatedNode)
    setHeaderText(headerColumnMessage.get(updatedNode.status))

    await updateTask({ newNode: updatedNode })
    if (onUpdate) onUpdate()
  }

  const handleNewTitleStatus = async (title: string) => {
    setNode((previousNode) => {
      const updatedNode = { ...previousNode, title }
      updateTask({ newNode: updatedNode })
      return updatedNode
    })

    if (onUpdate) onUpdate()
  }

  const handleCancelTitle = (oldDescription?: string) => {
    const isEmpty = !oldDescription || oldDescription.trim() === ''
    if (isEmpty) removeCheckmarkButton.current?.click()
  }

  const handleEnterKey = (value?: string) => {
    const isEmpty = !value || value.trim() === ''
    if (
      typeof index !== 'undefined' &&
      checklistLength &&
      index === checklistLength - 1 &&
      !isEmpty &&
      onCreate
    )
      onCreate()
  }

  const handleStartEdit = () => {
    if (isEditable) setIsEditing(true)
  }

  const handleStopEdit = () => {
    if (isEditable) setIsEditing(false)
  }

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <StyledKeyResultCheckMark alignItems="center">
        <Box py={1} display={isEditing ? 'none' : undefined}>
          {toggleTaskStatus ? (
            <Select
              value={newNode?.status}
              width="36"
              onChange={(event) => {
                handleSetNewTaskStatus(event.target.value)
              }}
            >
              {Object.keys(TASK_STATUS).map((name) => {
                const taskStatusName = headerColumnMessage.get(
                  TASK_STATUS[name as keyof typeof TASK_STATUS],
                )
                if (!taskStatusName) {
                  return (
                    <option key={name} value={name.toLocaleLowerCase()}>
                      {headerText && intl.formatMessage(headerText)}
                    </option>
                  )
                }

                return (
                  <option key={name} value={name.toLocaleLowerCase()}>
                    {intl.formatMessage(taskStatusName)}
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
              cursor="pointer"
              onClick={() => handleOpenSelectTaskStatus()}
            >
              {headerText && intl.formatMessage(headerText)}
            </Badge>
          )}
        </Box>
        <VStack marginLeft={0} spacing={2} align="stretch" w="full">
          <EditableInputField
            autoFocus={isDraft}
            isWaiting={isWaiting}
            value={node?.title}
            isLoaded={isLoaded}
            startWithEditView={isDraft}
            isDisabled={!isEditable || !canUpdate}
            onSubmit={handleNewTitleStatus}
            onCancel={handleCancelTitle}
            onPressedEnter={handleEnterKey}
            onStartEdit={handleStartEdit}
            onStopEdit={handleStopEdit}
          />
          <Text fontSize="sm" color="new-gray.600" lineHeight="0.7rem">
            {node.owner_full_name}
          </Text>
        </VStack>
        <Flex gap={2} alignItems="center">
          <DeleteTaskButton
            buttonRef={removeCheckmarkButton}
            className="deleteCheckMarkButton"
            keyResultID={keyResultID}
            taskID={newNode?.id}
            canDelete={canDelete}
            onDelete={onUpdate}
          />
          <Box>
            <NamedAvatar
              userID={node.owner}
              avatarSize={8}
              displaySubtitle={false}
              horizontalGap={2}
              showName={false}
              nameColor="gray.500"
            />
          </Box>
          {node.supportTeam.length > 0 ? (
            <Avatar name={'+' + node.supportTeam.length.toString()} size="sm" />
          ) : // eslint-disable-next-line unicorn/no-null
          null}
        </Flex>
      </StyledKeyResultCheckMark>
    </Skeleton>
  )
}
