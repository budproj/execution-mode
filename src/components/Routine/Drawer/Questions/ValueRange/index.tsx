import { HStack, Stack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import RadioCard from 'src/components/Base/RadioButton/radio-card'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface ValueRangeQuestionProperties extends FormQuestion {}

const ValueRangeQuestion = ({
  id,
  heading,
  answer,
  properties,
  setAnswer,
}: ValueRangeQuestionProperties) => {
  const [selectedRadio, setSelectedRadio] = useState(String(answer))

  const options = []

  if (properties) {
    for (let index = 0; index <= properties.steps - 1; index++) {
      options.push({
        value: (index + 1).toString(),
        desc:
          index === 0
            ? properties?.labels.left
            : index === properties.steps - 1
            ? properties?.labels.right
            : undefined,
      })
    }
  }

  const handleSubmit = () => {
    if (setAnswer && selectedRadio) setAnswer(id, selectedRadio)
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_NUMERICAL_SCALE_QUESTION',
    defaultValue: selectedRadio,
    onChange: setSelectedRadio,
  })

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm questionSubmit={handleSubmit}>
      <Stack gap={10} maxW="fit-content">
        <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
          {heading}
        </Text>
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
      </Stack>
    </BaseQuestionRoutineForm>
  )
}

export default ValueRangeQuestion
