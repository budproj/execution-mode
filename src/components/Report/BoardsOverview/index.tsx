import { Flex } from '@chakra-ui/react'
import React from 'react'

import Board from './Board'
import KeyResultConfidence from './KeyResultConfidences'

const BoardsOverview = ({ ...rest }) => {
  return (
    <Flex minHeight={155} {...rest} mt="36px" gridGap="24px">
      <Board title="Objetivos" number="24" paddingX={55} size="lg" color="new-gray.800" />
      <KeyResultConfidence />
    </Flex>
  )
}

export default BoardsOverview
