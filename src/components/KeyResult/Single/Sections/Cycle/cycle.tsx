import { Flex, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

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
      <Text fontWeight={500} color="black.600">
        {intl.formatMessage(messages.primaryLabel)}
      </Text>
      <Flex alignItems="flex-start" gridGap={10}>
        <DateWithTitle
          isLoaded={isCycleLoaded}
          label={messages.startLabel}
          date={new Date(cycle?.dateStart ?? '')}
        />

        <DateWithTitle
          isLoaded={isCycleLoaded}
          label={messages.endLabel}
          date={new Date(cycle?.dateEnd ?? '')}
          color="black.500"
        />

        <Flex alignItems="flex-start" direction="column">
          <Text fontWeight={300} color="black.300">
            {intl.formatMessage(messages.nameLabel)}
          </Text>
          <Skeleton isLoaded={isCycleLoaded} {...buildSkeletonMinSize(isCycleLoaded, 100, 20)}>
            <Text color="black.500">{cycle?.title}</Text>
          </Skeleton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionCycle
