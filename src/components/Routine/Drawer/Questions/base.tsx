import { Box, Stack, SlideFade } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

import SubmitAnswerButton from '../Base/submit-answer-button'

interface BaseQuestionRoutineFormProperties {
  children: JSX.Element | JSX.Element[]
}

const BaseQuestionRoutineForm = ({ children }: BaseQuestionRoutineFormProperties) => {
  const [isQuestionVisible, setIsQuestionVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsQuestionVisible(true), 300)
  }, [])

  return (
    <SlideFade in={isQuestionVisible} style={{ height: '100%' }}>
      <Stack display="flex" flexDir="column" justifyContent="space-between" height="100%">
        <Box>{children}</Box>
        <SubmitAnswerButton />
      </Stack>
    </SlideFade>
  )
}

export default BaseQuestionRoutineForm
