import { Flex, FormLabel, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')
const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export interface CheckInFormFieldGoalProperties {
  keyResultID?: KeyResult['id']
}

const CheckInFormFieldGoal = ({ keyResultID }: CheckInFormFieldGoalProperties) => {
  const intl = useIntl()
  const goal = useRecoilValue(goalSelector(keyResultID))
  const format = useRecoilValue(formatSelector(keyResultID))
  const Mask = selectMaskBasedOnFormat(format)

  return (
    <Flex alignSelf="flex-end" gridGap={1} pb={2}>
      <FormLabel fontSize="0.9rem" m={0} color="gray.400">
        {intl.formatMessage(messages.label)}
      </FormLabel>
      <Text color="gray.400">
        <Mask value={goal} displayType="text" fontSize="0.9rem" />
      </Text>
    </Flex>
  )
}

export default CheckInFormFieldGoal
