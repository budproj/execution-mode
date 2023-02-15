import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

export const getScrollableItem = (
  component?: React.ComponentClass<Record<string, unknown>, any>,
) => styled(component ?? Box)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    margin: 12px 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #b5c0db;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d9e2f7;
  }
`
