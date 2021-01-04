import { Tag } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { selectBackgroundColor, selectLabelColor } from './selectors'

export interface PercentageProgressIncreaseTagProperties {
  value?: number
}

const PercentageProgressIncreaseTag = ({ value = 0 }: PercentageProgressIncreaseTagProperties) => {
  const intl = useIntl()
  const bgColor = selectBackgroundColor(value)
  const labelColor = selectLabelColor(value)

  return (
    <Tag borderRadius="full" py={2} px={4} bg={bgColor} color={labelColor}>
      {intl.formatNumber(value / 100, {
        style: 'percent',
      })}
    </Tag>
  )
}

export default PercentageProgressIncreaseTag
