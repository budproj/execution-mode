import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverContentProps,
  TooltipProps,
  useStyleConfig,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { OPEN_DELAY_IN_MS } from 'src/components/Base/TooltipWithDelay/constants'

export interface TooltipWithRichTextProperties extends TooltipProps {
  children: ReactNode
  tooltip: PopoverContentProps['children']
}

const TooltipWithRichText = ({ children, tooltip, ...rest }: TooltipWithRichTextProperties) => {
  const styles = useStyleConfig('Tooltip', rest)

  return (
    <Popover trigger="hover" openDelay={OPEN_DELAY_IN_MS} variant="rich-tooltip">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent sx={styles} {...(rest as PopoverContentProps)}>
        {tooltip}
      </PopoverContent>
    </Popover>
  )
}

export default TooltipWithRichText
