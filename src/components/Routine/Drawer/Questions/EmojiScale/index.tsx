import { Box, HStack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { ChangeEvent, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

interface EmojiScaleQuestionProperties extends FormQuestion {}

const options = ['1', '2', '3', '4', '5']

const EmojiScaleQuestion = ({
  id,
  heading,
  hidden,
  answer,
  handleClick,
  setAnswer,
}: EmojiScaleQuestionProperties) => {
  const { getEmoji } = useGetEmoji()
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_SATISFACTION_QUESTION',
    value: answer,
  })
  const handleSelectRadioValue = useCallback((radioValue: string) => {
    if (setAnswer) setAnswer(id, radioValue, hidden)

    const radioTimer = setTimeout(() => setShowedQuestion((currentValue) => currentValue + 1), 600)

    return () => clearTimeout(radioTimer)
  }, [])

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm handleClick={handleClick}>
      <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold" mb={8}>
        {heading}
      </Text>
      <HStack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        {...group}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const selectedRadio = event.target.value
          handleSelectRadioValue(selectedRadio)
        }}
      >
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <VStack key={value} as="label">
              <Box cursor="pointer" mb={2}>
                {getEmoji({ felling: Number(value), size: '72px' })}
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
