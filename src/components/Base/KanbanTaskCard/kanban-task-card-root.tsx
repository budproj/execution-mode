import { Grid, GridProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

enum kanbanTaskCardViewMode {
  EDITION_MODE = 'EDITION_MODE',
  VIEW_MODE = 'VIEW_MODE',
}

interface KanbanTaskCardRootProperties extends GridProps {
  children: React.ReactNode
  mode?: kanbanTaskCardViewMode
}

const StyledGrid = styled(Grid)`
  background: linear-gradient(white, white) padding-box,
    linear-gradient(180deg, rgba(140, 139, 255, 0) 42.39%, #8c8bff 100%) border-box;
  border-radius: 10px;
  border: 2px solid transparent;
`

export const KanbanTaskCardRoot = ({
  children,
  mode = kanbanTaskCardViewMode.VIEW_MODE,
  ...rest
}: KanbanTaskCardRootProperties) => {
  return (
    <StyledGrid p={3} templateColumns="8fr 1fr" bgColor="#fff" w="100%" {...rest}>
      {children}
    </StyledGrid>
  )
}
