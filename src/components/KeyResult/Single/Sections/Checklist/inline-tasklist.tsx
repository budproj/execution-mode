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
  AvatarGroup,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import { EditableInputField } from 'src/components/Base'
import { useUpdateTask } from 'src/components/TaskManagement/hooks/new-task/use-update-task'
import { NamedAvatar } from 'src/components/User'
import { AllReachableUsers } from 'src/components/User/AllReachableUsers/wrapper'
import { Task, TASK_STATUS } from 'src/services/new-task-management/new-task-management.service'
import { TaskSummary } from 'src/services/okr/key-result/@types'

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
  node: TaskSummary | Task
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

  async function handleSetNewTaskStatus(status: string) {
    const updatedNode = {
      ...newNode,
      status: TASK_STATUS[status as keyof typeof TASK_STATUS],
    }

    setNode(updatedNode)
    setHeaderText(headerColumnMessage.get(updatedNode.status))

    await updateTask({
      taskId: updatedNode.id,
      data: { id: updatedNode.id, status: updatedNode.status },
    })
    if (onUpdate) onUpdate()
  }

  const handleNewTitleStatus = async (title: string) => {
    setNode((previousNode) => {
      const updatedNode = { ...previousNode, title }

      updateTask({
        taskId: updatedNode.id,
        data: { id: updatedNode.id, title: updatedNode.title },
      })
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

    await updateTask({
      taskId: updatedNode.id,
      data: { id: updatedNode.id, owner: ownerId },
    })
    if (onUpdate) onUpdate()
    onClose()
  }

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <StyledKeyResultCheckMark alignItems="start">
        <Box py={1} display={isEditing ? 'none' : undefined}>
          <Select
            value={newNode?.status}
            width="150px"
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
                  <option key={name} value={name} style={{ color: 'black' }}>
                    {headerText && intl.formatMessage(headerText)}
                  </option>
                )
              }

              return (
                <option key={name} value={name} style={{ color: 'black' }}>
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
                  <AvatarGroup>
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
                    {node.supportTeam && node.supportTeam.length > 0 ? (
                      <Avatar
                        name={'+ ' + node.supportTeam.length.toString()}
                        size="sm"
                        style={{ position: 'relative', marginLeft: '-12px' }}
                      />
                    ) : // eslint-disable-next-line unicorn/no-null
                    null}
                  </AvatarGroup>
                </Box>
              </PopoverTrigger>
              <PopoverContent width="md" h="full" overflow="hidden">
                <PopoverBody>
                  <AllReachableUsers avatarSubtitleType="role" onSelect={handleSetNewOwner} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
      </StyledKeyResultCheckMark>
    </Skeleton>
  )
}
