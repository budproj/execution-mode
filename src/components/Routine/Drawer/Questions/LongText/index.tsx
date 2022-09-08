import { Box, Flex, Stack, Text, Textarea } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { currentRoutinePropertiesAtom } from 'src/state/recoil/routine/current-routine-properties'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

import messages from './messages'

interface LongTextQuestionProperties extends FormQuestion {}

const LongTextQuestion = ({ id, heading, answer, setAnswer }: LongTextQuestionProperties) => {
  const intl = useIntl()

  const reference = useRef<HTMLTextAreaElement>(null)

  const { size } = useRecoilValue(currentRoutinePropertiesAtom)

  const handleSubmit = (event: FormEvent) => {
    if (setAnswer && reference.current?.value) setAnswer(id, reference.current.value)
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
    <BaseQuestionRoutineForm>
      <Stack height="100%">
        <Box display="flex" flexDir="column" alignItems="left" gap={2} marginBottom={8}>
          <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
            {heading}
          </Text>
        </Box>
        <Box>
          <Textarea
            ref={reference}
            value={answer}
            resize="none"
            variant="flushed"
            overflowWrap="break-word"
            placeholder={intl.formatMessage(messages.inputPlaceHolder)}
            _placeholder={{ color: 'new-gray.500' }}
            fontSize={21}
            padding="0px !important"
            height="42px !important"
            overflow="hidden"
            minH="0px !important"
            color="new-gray.800"
            onChange={(event) => {
              if (setAnswer) setAnswer(id, event.target.value)
            }}
          />
          <Flex pt={4} color="new-gray.700" fontSize={15}>
            <b>Shift &#8593;&nbsp;</b> +&nbsp;<b>Enter &#x23CE; &nbsp;</b>
            {intl.formatMessage(messages.lineBreakInstructionMessage)}
          </Flex>
        </Box>
      </Stack>
    </BaseQuestionRoutineForm>
  )
}

export default LongTextQuestion
