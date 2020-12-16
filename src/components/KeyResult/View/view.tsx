import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { KeyResult } from '../types'

import ViewBody from './Body'
import ViewHead from './Head'

export interface KeyResultViewProperties extends BoxProps {
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultView = ({ onLineClick, ...rest }: KeyResultViewProperties): ReactElement => (
  <Box {...rest}>
    <ViewHead />
    <ViewBody onLineClick={onLineClick} />
  </Box>
)

export default KeyResultView
