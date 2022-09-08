import { Box, Stack } from '@chakra-ui/react'
import React, { FormEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { currentRoutinePropertiesAtom } from 'src/state/recoil/routine/current-routine-properties'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import { useRoutineFormAnswers } from '../../hooks/setRoutineFormAnswers/set-routine-form-answers'
import SubmitAnswerButton from '../Base/submit-answer-button'

interface BaseQuestionRoutineFormProperties {
  children: JSX.Element | JSX.Element[]
}

const BaseQuestionRoutineForm = ({ children }: BaseQuestionRoutineFormProperties) => {
  const [currentQuestionIndex, setShowedQuestion] = useRecoilState(
    retrospectiveRoutineIndexQuestionAtom,
  )
  const { setRoutineFormAnswers } = useRoutineFormAnswers()

  const { size } = useRecoilValue(currentRoutinePropertiesAtom)

  const afterQuestion = () => {
    setShowedQuestion((currentValue) => currentValue + 1)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (size && currentQuestionIndex < size - 1) afterQuestion()
    if (size && currentQuestionIndex === size - 1) setRoutineFormAnswers()
  }

  return (
    <Stack
      height="100%"
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>{children}</Box>
      <SubmitAnswerButton />
    </Stack>
  )
}

export default BaseQuestionRoutineForm
