import { Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultCycle } from 'state/recoil/key-results/single/cycle'

export interface CycleProperties {
  id: KeyResult['id']
}

const Cycle = ({ id }: CycleProperties): ReactElement => {
  const cycle = useRecoilValue<KeyResult['cycle'] | undefined>(keyResultCycle(id))
  const intl = useIntl()
  const dateOptions: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
  }

  return cycle ? (
    <BaseGridItem>
      <Text color="gray.300">
        {intl.formatDate(cycle.start, dateOptions)} - {intl.formatDate(cycle.end, dateOptions)}
      </Text>
    </BaseGridItem>
  ) : (
    <>Loading</>
  )
}

export default Cycle
