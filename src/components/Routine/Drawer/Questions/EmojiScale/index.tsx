import { HStack, Image, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import RadioCard from 'src/components/Base/RadioButton/radio-card'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface EmojiScaleQuestionProperties extends FormQuestion {}

const options = [
  { value: '1', imageSource: '/icons/sad-face-emoji.png' },
  { value: '2', imageSource: '/icons/confused-face-emoji.png' },
  { value: '3', imageSource: '/icons/face-emoji.png' },
  { value: '4', imageSource: '/icons/happy-emoji.png' },
  { value: '5', imageSource: '/icons/smiling-face-emoji.png' },
]

const EmojiScaleQuestion = ({ id, heading, answer, setAnswer }: EmojiScaleQuestionProperties) => {
  const [selectedRadio, setSelectedRadio] = useState(answer)

  const handleSubmit = () => {
    if (setAnswer && selectedRadio) setAnswer(id, selectedRadio)
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_SATISFACTION_QUESTION',
    defaultValue: selectedRadio,
    onChange: setSelectedRadio,
  })

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm questionSubmit={handleSubmit}>
      <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold" mb={14}>
        {heading}
      </Text>
      <HStack display="flex" alignItems="center" justifyContent="space-between" mb={24} {...group}>
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
    </BaseQuestionRoutineForm>
  )
}

export default EmojiScaleQuestion
