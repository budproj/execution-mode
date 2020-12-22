import { Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultListBodyColumnCycleProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const cycleSelector = buildPartialSelector<KeyResult['objective']['cycle']>('objective.cycle')

const KeyResultListBodyColumnCycle = ({
  id,
}: KeyResultListBodyColumnCycleProperties): ReactElement => {
  const cycle = useRecoilValue(cycleSelector(id))

  const intl = useIntl()
  const dateOptions: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
  }

  const isCycleLoaded = Boolean(cycle)

  return (
    <KeyResultListBodyColumnBase>
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
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnCycle
