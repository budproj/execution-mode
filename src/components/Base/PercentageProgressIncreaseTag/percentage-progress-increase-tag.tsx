import { StyleProps, Tag } from '@chakra-ui/react'
import React from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

import ProgressIndicator from 'src/components/Base/ProgressIndicator'

import { selectBackgroundColor, selectLabelColor } from './selectors'

export interface PercentageProgressIncreaseTagProperties extends StyleProps {
  value: number
  forcePositiveSignal?: boolean
  showSignalArrow?: boolean
  minimumIntegerDigits?: FormatNumberOptions['minimumIntegerDigits']
  prefix?: string
}

const PercentageProgressIncreaseTag = ({
  value,
  bg,
  forcePositiveSignal,
  showSignalArrow,
  minimumIntegerDigits,
  prefix,
  ...rest
}: PercentageProgressIncreaseTagProperties) => {
  const intl = useIntl()

  const roundedValue = Math.round(value)
  const isValuePositive = roundedValue > 0
  const isValueNegative = roundedValue < 0

  const bgColor = bg ?? selectBackgroundColor(roundedValue)
  const labelColor = selectLabelColor(roundedValue)
  const arrowColor = selectLabelColor(
    roundedValue,
    !isValuePositive && !isValueNegative ? 300 : undefined,
  )

  const arrowType = isValuePositive ? 'increase' : isValueNegative ? 'decrease' : 'neutral'
  const normalizedMinimumIntegerDigits = roundedValue === 0 ? 1 : minimumIntegerDigits

  return (
    <Tag borderRadius="4" py={3} px={3} bg={bgColor} color={labelColor} gridGap={2} {...rest}>
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
