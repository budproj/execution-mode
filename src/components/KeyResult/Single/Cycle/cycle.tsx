import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import DateWithTitle from './date-with-title'
import messages from './messages'

export interface KeyResultSingleCycleProperties {
  keyResultID?: KeyResult['id']
}

const cycleSelector = buildPartialSelector<KeyResult['objective']['cycle']>('objective.cycle')

const Cycle = ({ keyResultID }: KeyResultSingleCycleProperties) => {
  const intl = useIntl()
  const cycle = useRecoilValue(cycleSelector(keyResultID))

  const isCycleLoaded = Boolean(cycle)

  return (
    <Flex gridGap={4} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.primaryLabel)}
      </Text>
      <Flex alignItems="flex-start" gridGap={10}>
        <DateWithTitle
          isLoaded={isCycleLoaded}
          title={intl.formatMessage(messages.startLabel)}
          formattedDate={intl.formatDate(cycle?.dateStart)}
        />

        <DateWithTitle
          isLoaded={isCycleLoaded}
          title={intl.formatMessage(messages.endLabel)}
          formattedDate={intl.formatDate(cycle?.dateEnd)}
          color="gray.500"
        />
      </Flex>
    </Flex>
  )
}

export default Cycle
