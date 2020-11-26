import { Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'

import { KeyResult } from 'components/KeyResult'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'

export interface CycleProperties {
  keyResult?: KeyResult
}

const Cycle = ({ keyResult }: CycleProperties): ReactElement => {
  const cycle = keyResult?.objective?.cycle
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
