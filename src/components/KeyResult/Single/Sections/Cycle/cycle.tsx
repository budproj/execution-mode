import { Flex, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import DateWithTitle from './date-with-title'
import messages from './messages'

export interface KeyResultSectionCycleProperties {
  keyResultID?: KeyResult['id']
}

const cycleSelector = buildPartialSelector<KeyResult['objective']['cycle']>('objective.cycle')

const KeyResultSectionCycle = ({ keyResultID }: KeyResultSectionCycleProperties) => {
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
          label={messages.startLabel}
          date={cycle?.dateStart}
        />

        <DateWithTitle
          isLoaded={isCycleLoaded}
          label={messages.endLabel}
          date={cycle?.dateEnd}
          color="gray.500"
        />

        <Flex alignItems="flex-start" direction="column">
          <Text fontWeight={300} color="gray.300">
            {intl.formatMessage(messages.nameLabel)}
          </Text>
          <Skeleton isLoaded={isCycleLoaded} {...buildSkeletonMinSize(isCycleLoaded, 100, 20)}>
            <Text color="gray.500">{cycle?.name}</Text>
          </Skeleton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionCycle
