import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

import { OPEN_DELAY_IN_MS } from './constants'

const TooltipWithDelay = ({ openDelay, ...rest }: TooltipProps) => (
  <Tooltip openDelay={openDelay} {...rest} />
)

TooltipWithDelay.defaultProps = {
  openDelay: OPEN_DELAY_IN_MS,
}

export default TooltipWithDelay
