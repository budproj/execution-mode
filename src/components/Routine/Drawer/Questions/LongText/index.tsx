import { Box, Flex, Stack, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import ResizeTextarea from 'react-textarea-autosize'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

import messages from './messages'

interface LongTextQuestionProperties extends FormQuestion {}

const LongTextQuestion = ({
  id,
  heading,
  hidden,
  answer,
  setAnswer,
}: LongTextQuestionProperties) => {
  const intl = useIntl()

  return (
    <BaseQuestionRoutineForm>
      <Stack>
        <Box display="flex" flexDir="column" alignItems="left" gap={2} marginBottom={16}>
          <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
            {heading}
          </Text>
        </Box>
        <Box>
          <Textarea
            as={ResizeTextarea}
            value={answer}
            resize="none"
            transition="none"
            variant="flushed"
            overflowWrap="break-word"
            placeholder={intl.formatMessage(messages.inputPlaceHolder)}
            _placeholder={{ color: 'new-gray.500' }}
            fontSize={21}
            padding="0px !important"
            minH="unset"
            w="100%"
            minRows={1}
            overflow="hidden"
            color="new-gray.800"
            onChange={(event) => {
              if (setAnswer) setAnswer(id, event.target.value, hidden)
            }}
          />
          <Flex justifyContent="center" pt={4} color="new-gray.700" fontSize={15}>
            <b>Shift &#8593;&nbsp;</b> +&nbsp;<b>Enter &#x23CE; &nbsp;</b>
            {intl.formatMessage(messages.lineBreakInstructionMessage)}
          </Flex>
        </Box>
      </Stack>
    </BaseQuestionRoutineForm>
  )
}

export default LongTextQuestion
