import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { routineAnswer } from '../../../types'

interface WrapperAnswerTitleProperties {
  answerTitle: routineAnswer['heading']
  children: JSX.Element
}

const WrapperAnswerTitle = ({ answerTitle, children }: WrapperAnswerTitleProperties) => {
  return (
    <Flex className="answerTitle" alignItems="center" gap={5} w="100%" maxWidth={265}>
      {children}
      <Text fontSize={14} color="new-gray.600">
        {answerTitle}
      </Text>
    </Flex>
  )
}

export default WrapperAnswerTitle
