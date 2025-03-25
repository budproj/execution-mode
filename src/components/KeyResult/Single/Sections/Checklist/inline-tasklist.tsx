import {
  Box,
  Flex,
  HStack,
  Skeleton,
  VStack,
  Text,
  Select,
  Avatar,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import router from 'next/router'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import { EditableInputField } from 'src/components/Base'
import { useUpdateTask } from 'src/components/TaskManagement/hooks/new-task/use-update-task'
import { NamedAvatar } from 'src/components/User'
import { AllReachableUsers } from 'src/components/User/AllReachableUsers/wrapper'
import { Task, TASK_STATUS } from 'src/services/new-task-management/new-task-management.service'

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
  [TASK_STATUS.pending, messages.pendingColumnHeading],
  [TASK_STATUS.toDo, messages.todoColumnHeading],
  [TASK_STATUS.doing, messages.doingColumnHeading],
  [TASK_STATUS.done, messages.doneColumnHeading],
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
  cycle?: string
  owner_full_name?: string | undefined
}

interface InlineTaskListProperties {
  keyResultID?: string
  draftCheckMarks?: string[]
  node: Task
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
  const { onOpen, onClose, isOpen } = useDisclosure()
  const isLoaded = Boolean(node)
  const isDraft = typeof node?.id === 'undefined' ? false : draftCheckMarks?.includes(node.id)
  const { id } = router.query
  const isWaiting = false
  const canUpdate = true
  const canDelete = true
  const intl = useIntl()
  const header = headerColumnMessage.get(node?.status ?? TASK_STATUS.pending)
  const removeCheckmarkButton = useRef<HTMLButtonElement>(null)
  const [headerText, setHeaderText] = useState(header)
  const [newNode, setNode] = useState(node)
  const [isEditing, setIsEditing] = useState(false)

  const { mutateAsync: updateTask } = useUpdateTask()

  const handleSetNewTaskStatus = useCallback( async (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const status = event.target.value
    const updatedNode = {
      ...newNode,
      status: TASK_STATUS[status.toUpperCase() as keyof typeof TASK_STATUS],
    }

    setNode(updatedNode)
    setHeaderText(headerColumnMessage.get(updatedNode.status))
    const filteredTeamId = (id as string) ?? ''
    await updateTask({
      teamId: filteredTeamId,
      taskId: updatedNode.id,
      data: { id: updatedNode.id, status: updatedNode.status },
    })
    if (onUpdate) onUpdate()
  }, [newNode, id, updateTask, onUpdate])

  const handleNewTitleStatus = async (title: string) => {
    setNode((previousNode) => {
      const updatedNode = { ...previousNode, title }
      const filteredTeamId = (id as string) ?? ''
      updateTask({ teamId: filteredTeamId, taskId: updatedNode.id, data: updatedNode })
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

  const handleSetNewOwner = async (ownerId: string) => {
    const updatedNode = {
      ...newNode,
      owner: ownerId,
    }

    setNode(updatedNode)
    const filteredTeamId = (id as string) ?? ''
    await updateTask({
      teamId: filteredTeamId,
      taskId: updatedNode.id,
      data: { id: updatedNode.id, owner: ownerId },
    })
    if (onUpdate) onUpdate()
    onClose()
  }

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <StyledKeyResultCheckMark alignItems="center">
        <Box py={1} display={isEditing ? 'none' : undefined}>
          <Select
            value={newNode?.status.toLocaleLowerCase()}
            width={newNode?.status === TASK_STATUS.doing ? '150px' : '130px'}
            height="30px"
            py="1px"
            px="3px"
            borderRadius="full"
            border="none"
            color="white"
            cursor="pointer"
            textTransform="uppercase"
            fontWeight="bold"
            fontSize="12px"
            background={ColumnColorScheme[newNode.status ?? TASK_STATUS.pending]}
            onChange={handleSetNewTaskStatus}
          >
            {Object.keys(TASK_STATUS).map((name) => {
              const taskStatusName = headerColumnMessage.get(
                TASK_STATUS[name as keyof typeof TASK_STATUS],
              )
              if (!taskStatusName) {
                return (
                  <option key={name} value={name.toLocaleLowerCase()} style={{ color: 'black' }}>
                    {headerText && intl.formatMessage(headerText)}
                  </option>
                )
              }

              return (
                <option key={name} value={name.toLocaleLowerCase()} style={{ color: 'black' }}>
                  {intl.formatMessage(taskStatusName)}
                </option>
              )
            })}
          </Select>
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
            {node.ownerFullName}
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
          <Box cursor="pointer">
            <Popover
              isLazy
              placement="bottom-end"
              size="md"
              isOpen={canUpdate && isOpen}
              onOpen={onOpen}
              onClose={onClose}
            >
              <PopoverTrigger>
                <Box>
                  <NamedAvatar
                    userID={newNode.owner}
                    avatarSize={8}
                    displaySubtitle={false}
                    horizontalGap={2}
                    nameColor="gray.500"
                    showName={false}
                    canEdit={canUpdate}
                    canHover={canUpdate}
                    isEditting={isOpen}
                  />
                </Box>
              </PopoverTrigger>
              <PopoverContent width="md" h="full" overflow="hidden">
                <PopoverBody>
                  <AllReachableUsers avatarSubtitleType="role" onSelect={handleSetNewOwner} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          {node.supportTeam && node.supportTeam.length > 0 ? (
            <Avatar name={'+' + node.supportTeam.length.toString()} size="sm" />
          ) : // eslint-disable-next-line unicorn/no-null
          null}
        </Flex>
      </StyledKeyResultCheckMark>
    </Skeleton>
  )
}
