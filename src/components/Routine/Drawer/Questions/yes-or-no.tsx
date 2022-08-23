import { HStack, Stack, Text, useRadioGroup } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

import SubmitAnswerButton from '../Base/submit-answer-button'

import { RoutineQuestionProperties } from './types'

interface YesOrNoProperties extends RoutineQuestionProperties {}

const YesOrNo = ({ question, answer, setAnswer, index }: YesOrNoProperties) => {
  const [selectedRadio, setSelectedRadio] = useState(answer)
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)
  const previousOrAfterQuestionIndex = selectedRadio === 'y' ? 1 : 2
  const options = [
    { value: 'y', desc: 'Sim' },
    { value: 'n', desc: 'Não' },
  ]

  const afterQuestion = () => {
    setShowedQuestion((actual) => actual + previousOrAfterQuestionIndex)
  }

  const handleSubmit = (event: FormEvent) => {
    if (setAnswer && selectedRadio) setAnswer(index, selectedRadio)
    event.preventDefault()
    afterQuestion()
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_SATISFACTION_QUESTION',
    defaultValue: selectedRadio,
    onChange: setSelectedRadio,
  })

  const group = getRootProps()

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={10}>
        <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
          {question}
        </Text>
        <HStack display="flex" alignItems="center" gap={2} mb={24} {...group}>
          {options.map((option) => {
            const { value, desc } = option

            const radio = getRadioProps({ value })
            return (
              <HStack
                key={value}
                as="label"
                padding={2}
                border="2px solid #B5C0DB"
                borderRadius={5}
                cursor="pointer"
                w={36}
              >
                <RadioCard
                  properties={radio}
                  radioCardStyles={{
                    _before: undefined,
                    width: '24px',
                    height: '24px',
                    margin: 0,
                  }}
                >
                  {value.toUpperCase()}
                </RadioCard>
                <Text color="new-gray.800" fontSize={21}>
                  {desc}
                </Text>
              </HStack>
            )
          })}
        </HStack>
        <SubmitAnswerButton />
      </Stack>
    </form>
  )
}

export default YesOrNo
