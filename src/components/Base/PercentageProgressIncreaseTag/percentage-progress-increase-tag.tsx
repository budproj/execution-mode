import { Tag, TagProps } from '@chakra-ui/react'
import React from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

import ProgressIndicator from 'src/components/Base/ProgressIndicator'

import { selectBackgroundColor, selectLabelColor } from './selectors'

export interface PercentageProgressIncreaseTagProperties {
  value: number
  fontSize: TagProps['fontSize']
  bg?: TagProps['bg']
  px?: TagProps['px']
  forcePositiveSignal?: boolean
  showSignalArrow?: boolean
  minimumIntegerDigits?: FormatNumberOptions['minimumIntegerDigits']
  prefix?: string
}

const PercentageProgressIncreaseTag = ({
  value,
  fontSize,
  bg,
  px,
  forcePositiveSignal,
  showSignalArrow,
  minimumIntegerDigits,
  prefix,
}: PercentageProgressIncreaseTagProperties) => {
  const intl = useIntl()

  const isValuePositive = value > 0
  const isValueNegative = value < 0

  const bgColor = bg ?? selectBackgroundColor(value)
  const labelColor = selectLabelColor(value)
  const arrowColor = selectLabelColor(value, !isValuePositive && !isValueNegative ? 300 : undefined)

  const roundedValue = Math.round(value)
  const arrowType = isValuePositive ? 'increase' : isValueNegative ? 'decrease' : 'neutral'
  const normalizedMinimumIntegerDigits = roundedValue === 0 ? 1 : minimumIntegerDigits

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
      {showSignalArrow && <ProgressIndicator type={arrowType} color={arrowColor} />}
      {prefix && `${prefix.trim()} `}
      {forcePositiveSignal && roundedValue > 0 && '+'}
      {intl.formatNumber(roundedValue / 100, {
        style: 'percent',
        minimumIntegerDigits: normalizedMinimumIntegerDigits,
      })}
    </Tag>
  )
}

PercentageProgressIncreaseTag.defaultProps = {
  value: 0,
  fontSize: 'sm',
}

export default PercentageProgressIncreaseTag
