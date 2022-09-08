import { HStack, Stack, Text, useRadioGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import RadioCard from 'src/components/Base/RadioButton/radio-card'

import BaseQuestionRoutineForm from '../base'
import { FormQuestion } from '../types'

import messages from './messages'

interface RoadBlockQuestionProperties extends FormQuestion {}

const RoadBlockQuestion = ({ id, heading, answer, setAnswer }: RoadBlockQuestionProperties) => {
  const intl = useIntl()

  const [selectedRadio, setSelectedRadio] = useState(() => answer)
  const options = [
    { value: 'y', desc: intl.formatMessage(messages.firstOptionDescription) },
    { value: 'n', desc: intl.formatMessage(messages.secondOptionDescription) },
  ]

  const handleSubmit = () => {
    if (setAnswer && selectedRadio) setAnswer(id, selectedRadio)
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ROUTINES_ROADBLOCK_QUESTION',
    value: selectedRadio,
    onChange: setSelectedRadio,
  })

  const group = getRootProps()

  return (
    <BaseQuestionRoutineForm questionSubmit={handleSubmit}>
      <Stack gap={14}>
        <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
          {heading}
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
      </Stack>
    </BaseQuestionRoutineForm>
  )
}

export default RoadBlockQuestion
