import { HStack, Stack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { ChangeEvent, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface ValueRangeQuestionProperties extends FormQuestion {}

const ValueRangeQuestion = ({
  id,
  heading,
  hidden,
  answer,
  properties,
  setAnswer,
  handleClick,
}: ValueRangeQuestionProperties) => {
  const options = []

  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const handleSelectRadioValue = useCallback((radioValue: string) => {
    if (setAnswer) setAnswer(id, radioValue, hidden)

    const radioTimer = setTimeout(() => setShowedQuestion((currentValue) => currentValue + 1), 600)

    return () => clearTimeout(radioTimer)
  }, [])

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

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_NUMERICAL_SCALE_QUESTION',
    defaultValue: answer,
  })

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm handleClick={handleClick}>
      <Stack gap={10} maxW="fit-content">
        <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
          {heading}
        </Text>
        <HStack
          display="flex"
          alignItems="flex-start"
          justifyContent="space-around"
          {...group}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const selectedRadio = event.target.value
            handleSelectRadioValue(selectedRadio)
          }}
        >
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
