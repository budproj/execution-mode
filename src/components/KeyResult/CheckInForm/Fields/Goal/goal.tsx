import { Box, Flex, FormLabel, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import FlagIcon from 'src/components/Icon/Flag'
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
    <Box flex="1 1 0px">
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Flex py="6px" alignItems="center" gridGap={2}>
        <FlagIcon
          fill="gray.600"
          w="20px"
          h="auto"
          desc={intl.formatMessage(messages.flagIconDesc)}
        />
        <Text color="gray.400">
          <Mask value={goal} displayType="text" fontSize="0.9rem" />
        </Text>
      </Flex>
    </Box>
  )
}

export default CheckInFormFieldGoal
