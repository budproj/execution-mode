import { HStack, Image, Stack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

import SubmitAnswerButton from '../Base/submit-answer-button'

import { RoutineQuestionProperties } from './types'

interface SatisfactionProperties extends RoutineQuestionProperties {}

const options = [
  { value: '1', imageSource: '/icons/sad-face-emoji.png' },
  { value: '2', imageSource: '/icons/confused-face-emoji.png' },
  { value: '3', imageSource: '/icons/face-emoji.png' },
  { value: '4', imageSource: '/icons/happy-emoji.png' },
  { value: '5', imageSource: '/icons/smiling-face-emoji.png' },
]

const Satisfaction = ({ question, answer, setAnswer, index }: SatisfactionProperties) => {
  const [selectedRadio, setSelectedRadio] = useState(answer)
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const afterQuestion = () => {
    setShowedQuestion((actual) => actual + 1)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (setAnswer && selectedRadio) setAnswer(index, selectedRadio)
    afterQuestion()
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_SATISFACTION_QUESTION',
    defaultValue: selectedRadio,
    onChange: setSelectedRadio,
  })

  const group = getRootProps()

  return (
    <Stack>
      <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold" mb={14}>
        {question}
      </Text>
      <form onSubmit={handleSubmit}>
        <HStack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={24}
          {...group}
        >
          {options.map((option) => {
            const { value, imageSource } = option

            const radio = getRadioProps({ value })
            return (
              <VStack key={value} as="label">
                <Image cursor="pointer" w={74} src={imageSource} mb={5} />
                <RadioCard properties={radio}>{value}</RadioCard>
              </VStack>
            )
          })}
        </HStack>
        <SubmitAnswerButton />
      </form>
    </Stack>
  )
}

export default Satisfaction
