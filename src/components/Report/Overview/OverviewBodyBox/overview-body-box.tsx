import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

import { PADDING } from 'src/components/Report/Overview/constants'

const OverviewHeaderBox = (properties: FlexProps) => <Flex p={PADDING} {...properties} />

OverviewHeaderBox.defaultProps = {
  flexDirection: 'column',
}

export default OverviewHeaderBox
