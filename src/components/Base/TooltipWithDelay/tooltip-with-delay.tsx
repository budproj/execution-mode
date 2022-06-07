import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

import { OPEN_DELAY_IN_MS } from './constants'

// The openDelay must be 0 until the following bug is fixed:
// https://github.com/chakra-ui/chakra-ui/issues/3951
const TooltipWithDelay = ({ openDelay: _, ...rest }: TooltipProps) => (
  <Tooltip openDelay={0} maxWidth="max-content" {...rest} />
)

TooltipWithDelay.defaultProps = {
  openDelay: OPEN_DELAY_IN_MS,
}

export default TooltipWithDelay
