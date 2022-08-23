import { HStack, Stack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

import SubmitAnswerButton from '../Base/submit-answer-button'

import { RoutineQuestionProperties } from './types'

interface SatisfactionProperties extends RoutineQuestionProperties {
  indexRange?: number
}

const NumericalScale = ({
  question,
  answer,
  setAnswer,
  indexRange = 5,
  index,
}: SatisfactionProperties) => {
  const [selectedRadio, setSelectedRadio] = useState(answer)
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const options = [
    { value: '1', desc: 'Pouco' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5', desc: 'Muito' },
  ]

  const afterQuestion = () => {
    const afterQuestionIndex = Number(selectedRadio) <= indexRange ? 1 : 2
    setShowedQuestion((actual) => actual + afterQuestionIndex)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (setAnswer && selectedRadio) setAnswer(index, selectedRadio)
    afterQuestion()
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_NUMERICAL_SCALE_QUESTION',
    defaultValue: selectedRadio,
    onChange: setSelectedRadio,
  })

  const group = getRootProps()

  return (
    <Stack gap={10} maxW="fit-content">
      <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
        {question}
      </Text>
      <form onSubmit={handleSubmit}>
        <HStack display="flex" alignItems="flex-start" justifyContent="space-around" {...group}>
          {options.map((option) => {
            const { value, desc } = option

            const radio = getRadioProps({ value })
            return (
              <VStack key={value} as="label" gap={4}>
                <RadioCard
                  properties={radio}
                  radioCardStyles={{
                    width: '40px',
                    height: '40px',
                    fontSize: '24px',
                    lineHeight: '40px',
                    textAlign: 'center',
                  }}
                >
                  {value}
                </RadioCard>
                <Text fontSize={18} color="new-gray.800">
                  {desc}
                </Text>
              </VStack>
            )
          })}
        </HStack>
        <SubmitAnswerButton />
      </form>
    </Stack>
  )
}

export default NumericalScale
