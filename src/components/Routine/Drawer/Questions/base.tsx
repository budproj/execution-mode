import { Box, Stack } from '@chakra-ui/react'
import React, { FormEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import SubmitAnswerButton from '../Base/submit-answer-button'

interface BaseQuestionRoutineFormProperties {
  children: JSX.Element | JSX.Element[]
  questionSubmit: (event: FormEvent) => void
  afterQuestionIndex?: number
}

const BaseQuestionRoutineForm = ({
  children,
  questionSubmit,
  afterQuestionIndex = 1,
}: BaseQuestionRoutineFormProperties) => {
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const afterQuestion = () => {
    setShowedQuestion((currentValue) => ({
      currentQuestionIndex: currentValue.currentQuestionIndex + afterQuestionIndex,
      stepsFromPreviousQuestion: afterQuestionIndex,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    questionSubmit(event)
    event.preventDefault()
    afterQuestion()
  }

  return (
    <Stack height="100%">
      <form
        style={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onSubmit={handleSubmit}
      >
        <Box>{children}</Box>
        <SubmitAnswerButton />
      </form>
    </Stack>
  )
}

export default BaseQuestionRoutineForm
