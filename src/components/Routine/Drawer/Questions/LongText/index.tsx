import { Box, Flex, Stack, Text, Textarea } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

import SubmitAnswerButton from '../../Base/submit-answer-button'
import { FormQuestion } from '../types'

import messages from './messages'

interface LongTextQuestionProperties extends FormQuestion {}

const LongTextQuestion = ({ id, heading, answer, setAnswer }: LongTextQuestionProperties) => {
  const intl = useIntl()

  const reference = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState(answer)

  const [_, setShowedQuestion] = useRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const afterQuestion = () => {
    setShowedQuestion((currentValue) => ({
      currentQuestionIndex: currentValue.currentQuestionIndex + 1,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    if (setAnswer && reference.current?.value) setAnswer(id, reference.current.value)
    event?.preventDefault()
    afterQuestion()
  }

  const handleKeyDown = (event: any) => {
    const keyCode = event.which || event.key

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
    <Stack align="center" height="100%">
      <form
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onSubmit={handleSubmit}
      >
        <Box display="flex" flexDir="column" alignItems="left" gap={2} marginBottom={8}>
          <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
            {heading}
          </Text>
        </Box>
        <Box>
          <Textarea
            ref={reference}
            value={inputValue}
            resize="none"
            variant="flushed"
            placeholder={intl.formatMessage(messages.inputPlaceHolder)}
            _placeholder={{ color: 'new-gray.500' }}
            fontSize={21}
            padding="0px !important"
            height="40px !important"
            overflowY="auto"
            minH="0px !important"
            color="new-gray.800"
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Flex pt={4} color="new-gray.700" fontSize={15}>
            <b>Shift &#8593;&nbsp;</b> +&nbsp;<b>Enter &#x23CE; &nbsp;</b>
            {intl.formatMessage(messages.lineBreakInstructionMessage)}
          </Flex>
        </Box>
        <SubmitAnswerButton />
      </form>
    </Stack>
  )
}

export default LongTextQuestion
