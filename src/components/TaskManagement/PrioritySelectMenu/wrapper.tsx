import { Flex, FlexProps, MenuItemOption, MenuProps, Text, useToken } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { TaskPriorityIcon } from 'src/components/Base/KanbanTaskCard/kanban-task-card-metadata'
import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'

import SelectMenu from '../../Base/SelectMenu'

import messages from './messages'

interface TaskPrioritySelectMenuProperties {
  readonly value: string
  readonly onChange?: (newPriority: TaskPriority) => void
  readonly placement?: MenuProps['placement']
  readonly isLazy?: boolean
}

const StyledText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  line-height: 150%;
`

export const TaskPrioritySelectMenu = ({
  value,
  onChange,
  placement,
  ...rest
}: TaskPrioritySelectMenuProperties) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (newPriority: string | string[]) => {
    if (Array.isArray(newPriority)) throw new Error('Cannot parse string array')
    if (onChange) onChange(Number(newPriority) as TaskPriority)
    handleClose()
  }

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <SelectMenu
      matchWidth
      isLazy
      closeOnSelect
      isOpen={isOpen}
      scroolable={false}
      value={value}
      placement={placement}
      placeholder={<PrirityItemOption priority={Number(value) as TaskPriority} />}
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
      {...rest}
    >
      <MenuItemOption value="1">
        <PrirityItemOption priority={1} />
      </MenuItemOption>
      <MenuItemOption value="2">
        <PrirityItemOption priority={2} />
      </MenuItemOption>
      <MenuItemOption value="3">
        <PrirityItemOption priority={3} />
      </MenuItemOption>
      <MenuItemOption value="4">
        <PrirityItemOption priority={4} />
      </MenuItemOption>
    </SelectMenu>
  )
}

type PriorityItemOptionProperties = FlexProps & {
  readonly priority: TaskPriority
}

export const PrirityItemOption = ({ priority, ...rest }: PriorityItemOptionProperties) => {
  const intl = useIntl()
  const [veryHigh, high, medium, low] = useToken('colors', [
    'red.600',
    'red.500',
    'yellow.600',
    'blue.500',
  ])

  const taskPriorityColors = {
    1: low,
    2: medium,
    3: high,
    4: veryHigh,
  }

  return (
    <Flex alignItems="center" gap={2} {...rest}>
      <TaskPriorityIcon priority={priority} />
      <StyledText color={taskPriorityColors[priority]}>
        {intl.formatMessage(messages.priotiryLabelMessage, { priority: String(priority) })}
      </StyledText>
    </Flex>
  )
}
