import { Flex } from '@chakra-ui/react'
import React from 'react'

// TODO: change interface
interface AnswerContentProperties {
  answer: Record<string, unknown>
}

const AnswerContent = ({ answer }: AnswerContentProperties) => {
  return <Flex>Answer</Flex>
}

export default AnswerContent
