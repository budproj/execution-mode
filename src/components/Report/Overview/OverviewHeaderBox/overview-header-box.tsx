import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

import { BORDER_COLOR, BORDER_WIDTH, PADDING } from 'src/components/Report/Overview/constants'

const OverviewHeaderBox = (properties: BoxProps) => (
  <Box p={PADDING} borderBottomWidth={BORDER_WIDTH} borderColor={BORDER_COLOR} {...properties} />
)

export default OverviewHeaderBox
