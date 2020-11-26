import { Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { keyResultViewSelectors } from 'state/recoil/key-result/view'

export interface CycleProperties {
  id?: KeyResult['id']
}

const Cycle = ({ id }: CycleProperties): ReactElement => {
  const cycleSelector = keyResultViewSelectors.selectKeyResultCycle(id)
  const cycle = useRecoilValue(cycleSelector)

  const intl = useIntl()
  const dateOptions: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
  }

  const isCycleLoaded = Boolean(cycle)

  return (
    <BaseGridItem>
      <Skeleton isLoaded={isCycleLoaded}>
        <Text color="gray.300">
          {intl.formatDate(cycle?.dateStart, dateOptions)} -{' '}
          {intl.formatDate(cycle?.dateEnd, dateOptions)}
        </Text>
      </Skeleton>
    </BaseGridItem>
  )
}

export default Cycle
