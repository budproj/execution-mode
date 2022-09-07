import { Box, HStack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { useGetEmoji } from 'src/components/Routine/hooks'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface EmojiScaleQuestionProperties extends FormQuestion {}

const options = [1, 2, 3, 4, 5]

const EmojiScaleQuestion = ({ id, heading, answer, setAnswer }: EmojiScaleQuestionProperties) => {
  const [selectedRadio, setSelectedRadio] = useState(
    typeof answer === 'number' ? answer : undefined,
  )
  const { getEmoji } = useGetEmoji()

  const handleSubmit = () => {
    if (setAnswer && selectedRadio) setAnswer(id, selectedRadio)
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_SATISFACTION_QUESTION',
    value: selectedRadio,
  })

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm questionSubmit={handleSubmit}>
      <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold" mb={14}>
        {heading}
      </Text>
      <HStack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={24}
        {...group}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const selectedRadio = Number(event.target.value)
          setSelectedRadio(selectedRadio)
        }}
      >
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <VStack key={value} as="label">
              <Box cursor="pointer" mb={5}>
                {getEmoji({ felling: value, size: '76px' })}
              </Box>
              <RadioCard properties={radio}>{value}</RadioCard>
            </VStack>
          )
        })}
      </HStack>
    </BaseQuestionRoutineForm>
  )
}

export default EmojiScaleQuestion
