import { Text } from '@chakra-ui/react'
import React from 'react'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface ReadingTextQuestionProperties extends FormQuestion {}

const ReadingTextQuestion = ({ heading, content }: ReadingTextQuestionProperties) => {
  return (
    <BaseQuestionRoutineForm>
      <Text as="h2" color="new-gray.900" fontWeight="bold" fontSize={21} mb={2}>
        {heading}
      </Text>
      <Text color="new-gray.700" fontSize={18} whiteSpace="pre-line">
        {content}
      </Text>
    </BaseQuestionRoutineForm>
  )
}

export default ReadingTextQuestion
