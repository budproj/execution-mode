import { Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult'
import BaseGridItem from 'src/components/KeyResult/View/Body/Columns/Base'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface CycleProperties {
  id?: KeyResult['id']
}

const cycleSelector = buildPartialSelector<KeyResult['objective']['cycle']>('objective.cycle')

const Cycle = ({ id }: CycleProperties): ReactElement => {
  const cycle = useRecoilValue(cycleSelector(id))

  const intl = useIntl()
  const dateOptions: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
  }

  const isCycleLoaded = Boolean(cycle)

  return (
    <BaseGridItem>
      <Skeleton
        isLoaded={isCycleLoaded}
        fadeDuration={0}
        /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
      >
        <Text color="gray.300">
          {intl.formatDate(cycle?.dateStart, dateOptions)} -{' '}
          {intl.formatDate(cycle?.dateEnd, dateOptions)}
        </Text>
      </Skeleton>
    </BaseGridItem>
  )
}

export default Cycle
