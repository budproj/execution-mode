import { Stack } from '@chakra-ui/react'
import React, { FormEvent } from 'react'
import { useRecoilState } from 'recoil'

import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

interface ExplanatoryTextProperties {
  children?: JSX.Element
}

const ExplanatoryText = ({ children }: ExplanatoryTextProperties) => {
  const [_, setShowedQuestion] = useRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const afterQuestion = () => {
    setShowedQuestion((actual) => actual + 1)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    afterQuestion()
  }

  return (
    <Stack>
      <form onSubmit={handleSubmit}>{children}</form>
    </Stack>
  )
}

export default ExplanatoryText
