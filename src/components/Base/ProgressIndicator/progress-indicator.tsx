import React from 'react'
import { useIntl } from 'react-intl'

import ArrowHeadDownIcon from 'src/components/Icon/ArrowHeadDown'
import ArrowHeadUpIcon from 'src/components/Icon/ArrowHeadUp'
import MinusSolidIcon from 'src/components/Icon/MinusSolid'
import { ColorToken, COLOR_SCHEME } from 'src/themes/tokens'

import messages from './messages'

export interface ProgressIndicatorProperties {
  type: 'increase' | 'decrease' | 'neutral'
  colorScheme: COLOR_SCHEME
  color?: ColorToken
}

const ProgressIndicator = ({ type, colorScheme, color }: ProgressIndicatorProperties) => {
  const intl = useIntl()

  const fill = color ?? `${colorScheme}.500`
  const iconHashmap = {
    increase: () => (
      <ArrowHeadUpIcon desc={intl.formatMessage(messages.increaseIconDesc)} fill={fill} />
    ),
    decrease: () => (
      <ArrowHeadDownIcon desc={intl.formatMessage(messages.decreaseIconDesc)} fill={fill} />
    ),
    neutral: () => (
      <MinusSolidIcon desc={intl.formatMessage(messages.neutralIconDesc)} fill={fill} />
    ),
  }
  const Icon = iconHashmap[type]

  return <Icon />
}

ProgressIndicator.defaultProps = {
  type: 'neutral',
  colorScheme: 'gray',
}

export default ProgressIndicator
