import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

import { PADDING } from 'src/components/Report/Overview/constants'

const OverviewHeaderBox = (properties: BoxProps) => <Box p={PADDING} {...properties} />

export default OverviewHeaderBox
