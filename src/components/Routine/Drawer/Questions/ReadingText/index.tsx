import { Text } from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface ReadingTextQuestionProperties extends FormQuestion {}

const ReadingTextQuestion = ({ heading, content, handleClick }: ReadingTextQuestionProperties) => {
  return (
    <BaseQuestionRoutineForm handleClick={handleClick}>
      <Text as="h2" color="new-gray.900" fontWeight="bold" fontSize={21} mb={2}>
        {heading}
      </Text>

      <Text
        as={ReactMarkdown}
        color="new-gray.700"
        fontSize={18}
        whiteSpace="pre-line"
        components={{
          strong: ({ ...properties }) => <b style={{ color: '#6F6EFF' }} {...properties} />,
        }}
      >
        {content}
      </Text>
    </BaseQuestionRoutineForm>
  )
}

export default ReadingTextQuestion
