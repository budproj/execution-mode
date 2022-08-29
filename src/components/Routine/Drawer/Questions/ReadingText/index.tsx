import { Text } from '@chakra-ui/react'
import React, { FormEvent } from 'react'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface ReadingTextQuestionProperties extends FormQuestion {}

const handleSubmit = (event: FormEvent) => event.preventDefault()

const ReadingTextQuestion = ({ heading, content }: ReadingTextQuestionProperties) => {
  return (
    <BaseQuestionRoutineForm questionSubmit={handleSubmit}>
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
