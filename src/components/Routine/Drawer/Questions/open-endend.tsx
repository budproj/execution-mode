import { Box, Flex, Stack, Text, Textarea } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

import SubmitAnswerButton from '../Base/submit-answer-button'

import { RoutineQuestionProperties } from './types'

interface ExplanatoryTextProperties extends RoutineQuestionProperties {
  description?: string
}

const OpenEndend = ({
  question,
  answer,
  description,
  setAnswer,
  index,
  previousIndexQuestion,
}: ExplanatoryTextProperties) => {
  const reference = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState(answer)

  const [_, setShowedQuestion] = useRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const afterQuestion = () => {
    setShowedQuestion((actual) => actual + 1)
  }

  const handleSubmit = (event: FormEvent) => {
    if (setAnswer && reference.current?.value) setAnswer(index, reference.current.value)
    event.preventDefault()
    afterQuestion()
  }

  const handleKeyDown = (event: any) => {
    const keyCode = event.which || event.keyCode

    if (keyCode === 13 && !event.shiftKey) {
      handleSubmit(event)
    }
  }

  useEffect(() => {
    if (reference.current) {
      reference.current.addEventListener('keydown', handleKeyDown)
    }

    if (reference.current) window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Stack align="center">
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <Box display="flex" flexDir="column" alignItems="left" gap={2} marginBottom={8}>
          <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
            {question}
          </Text>
          {description && (
            <Text color="new-gray.700" fontSize={16}>
              {description}
            </Text>
          )}
        </Box>
        <Textarea
          ref={reference}
          value={inputValue}
          resize="none"
          mt={38}
          variant="flushed"
          placeholder="Clique para começar a digitar"
          _placeholder={{ color: 'new-gray.500' }}
          fontSize={21}
          color="new-gray.800"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Flex pt={2} color="new-gray.700" fontSize={15}>
          <b>Shift &#8593;&nbsp;</b> +&nbsp;<b>Enter &#x23CE; &nbsp;</b>para fazer quebra de linha
        </Flex>
        <SubmitAnswerButton previousQuestionIndex={previousIndexQuestion} />
      </form>
    </Stack>
  )
}

export default OpenEndend
