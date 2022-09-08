import { Box, HStack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { useGetEmoji } from 'src/components/Routine/hooks'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface EmojiScaleQuestionProperties extends FormQuestion {}

const options = ['1', '2', '3', '4', '5']

const EmojiScaleQuestion = ({ id, heading, answer, setAnswer }: EmojiScaleQuestionProperties) => {
  const { getEmoji } = useGetEmoji()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_SATISFACTION_QUESTION',
    value: answer,
  })

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm>
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
          const selectedRadio = event.target.value
          if (setAnswer) setAnswer(id, selectedRadio)
        }}
      >
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <VStack key={value} as="label">
              <Box cursor="pointer" mb={5}>
                {getEmoji({ felling: Number(value), size: '76px' })}
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
