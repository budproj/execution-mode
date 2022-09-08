import { HStack, Stack, Text, useRadioGroup } from '@chakra-ui/react'
import React, { ChangeEvent, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import RadioCard from 'src/components/Base/RadioButton/radio-card'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

import messages from './messages'

interface RoadBlockQuestionProperties extends FormQuestion {}

const RoadBlockQuestion = ({ id, heading, answer, setAnswer }: RoadBlockQuestionProperties) => {
  const intl = useIntl()
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const options = [
    { value: 'y', desc: intl.formatMessage(messages.firstOptionDescription) },
    { value: 'n', desc: intl.formatMessage(messages.secondOptionDescription) },
  ]

  const handleSelectRadioValue = useCallback((radioValue: string) => {
    if (setAnswer) setAnswer(id, radioValue)

    const radioTimer = setTimeout(() => setShowedQuestion((currentValue) => currentValue + 1), 300)

    return () => clearTimeout(radioTimer)
  }, [])

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_ROADBLOCK_QUESTION',
    value: answer,
  })

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm>
      <Stack gap={14}>
        <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
          {heading}
        </Text>
        <HStack
          display="flex"
          alignItems="center"
          gap={2}
          mb={24}
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
      </Stack>
    </BaseQuestionRoutineForm>
  )
}

export default RoadBlockQuestion
