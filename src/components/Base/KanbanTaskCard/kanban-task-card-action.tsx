import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

const StyledBox = styled(Box)`
  position: relative;
  width: 5px;
  height: 5px;
  border-radius: 50%;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    background-color: inherit;
    border-radius: inherit;
  }

  &:before {
    top: 8px;
  }

  &:after {
    top: 16px;
  }
`

export const KanbanTaskCardActions = () => {
  return <StyledBox backgroundColor="new-gray.800" />
}
