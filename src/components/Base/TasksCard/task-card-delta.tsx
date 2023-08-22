import React from 'react'

import PercentageProgressIncreaseTag from '../PercentageProgressIncreaseTag'

interface TaskCardDeltaProperties {
  value: number
}

export const TaskCardDelta = ({ value }: TaskCardDeltaProperties) => {
  return (
    <PercentageProgressIncreaseTag
      forcePositiveSignal
      border="1px solid"
      borderRadius={4}
      w="49px"
      h="24px"
      fontSize={14}
      fontWeight="bold"
      value={value}
      p={2}
      gridGap={2}
    />
  )
}
