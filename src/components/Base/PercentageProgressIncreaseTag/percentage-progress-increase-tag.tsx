import { StatArrow, Tag, TagProps } from '@chakra-ui/react'
import React from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

import { selectBackgroundColor, selectLabelColor } from './selectors'

export interface PercentageProgressIncreaseTagProperties {
  value: number
  fontSize: TagProps['fontSize']
  bg?: TagProps['bg']
  px?: TagProps['px']
  forcePositiveSignal?: boolean
  showSignalArrow?: boolean
  minimumIntegerDigits?: FormatNumberOptions['minimumIntegerDigits']
}

const PercentageProgressIncreaseTag = ({
  value,
  fontSize,
  bg,
  px,
  forcePositiveSignal,
  showSignalArrow,
  minimumIntegerDigits,
}: PercentageProgressIncreaseTagProperties) => {
  const intl = useIntl()

  const bgColor = bg ?? selectBackgroundColor(value)
  const labelColor = selectLabelColor(value)

  const shouldRenderSignalArrow = showSignalArrow && value !== 0
  const arrowType = shouldRenderSignalArrow && value > 0 ? 'increase' : 'decrease'
  const normalizedMinimumIntegerDigits = value === 0 ? 1 : minimumIntegerDigits

  return (
    <Tag
      borderRadius="full"
      py={2}
      px={px ?? 4}
      bg={bgColor}
      color={labelColor}
      gridGap={2}
      fontSize={fontSize}
    >
      {forcePositiveSignal && value > 0 && '+'}
      {intl.formatNumber(value / 100, {
        style: 'percent',
        minimumIntegerDigits: normalizedMinimumIntegerDigits,
      })}
      {shouldRenderSignalArrow && <StatArrow type={arrowType} color={labelColor} />}
    </Tag>
  )
}

PercentageProgressIncreaseTag.defaultProps = {
  value: 0,
  fontSize: 'sm',
}

export default PercentageProgressIncreaseTag
