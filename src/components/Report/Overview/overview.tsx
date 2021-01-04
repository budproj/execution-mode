import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

import { BORDER_COLOR, BORDER_WIDTH } from './constants'

const OverviewHeaderBox = (properties: BoxProps) => (
  <Box borderWidth={BORDER_WIDTH} borderColor={BORDER_COLOR} {...properties} />
)

export default OverviewHeaderBox
