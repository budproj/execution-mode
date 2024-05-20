import { Grid, GridProps, useToken } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

enum kanbanTaskCardViewMode {
  EDITION_MODE = 'EDITION_MODE',
  VIEW_MODE = 'VIEW_MODE',
}

export type TaskPriority = 1 | 2 | 3 | 4
interface StyledGridProperties {
  customBorderColor: string
}

interface KanbanTaskCardRootProperties extends GridProps {
  children: React.ReactNode
  taskPriority: TaskPriority
  mode?: kanbanTaskCardViewMode
  isActive?: boolean
}

const StyledGrid = styled(Grid)<StyledGridProperties>`
  background: linear-gradient(white, white) padding-box,
    linear-gradient(
        180deg,
        rgba(140, 139, 255, 0) 42.39%,
        ${({ customBorderColor }) => customBorderColor} 100%
      )
      border-box;
  border-radius: 10px;
  border: 2px solid transparent;
`

export const KanbanTaskCardRoot = ({
  children,
  mode = kanbanTaskCardViewMode.VIEW_MODE,
  taskPriority,
  isActive,
  ...rest
}: KanbanTaskCardRootProperties) => {
  console.log({ mode })
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
    <StyledGrid
      p={3}
      bgColor="#fff"
      _hover={{ bgColor: '#f7f7f7' }}
      w="100%"
      customBorderColor={isActive ? taskPriorityColors[taskPriority] : 'gray'}
      {...rest}
    >
      {children}
    </StyledGrid>
  )
}
