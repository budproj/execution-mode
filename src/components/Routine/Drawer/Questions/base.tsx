import { Box, Stack } from '@chakra-ui/react'
import React from 'react'

import SubmitAnswerButton from '../Base/submit-answer-button'

interface BaseQuestionRoutineFormProperties {
  children: JSX.Element | JSX.Element[]
}

const BaseQuestionRoutineForm = ({ children }: BaseQuestionRoutineFormProperties) => {
  return (
    <Stack display="flex" flexDir="column" justifyContent="space-between" height="100%">
      <Box height="100%">{children}</Box>
      <SubmitAnswerButton />
    </Stack>
  )
}

export default BaseQuestionRoutineForm
