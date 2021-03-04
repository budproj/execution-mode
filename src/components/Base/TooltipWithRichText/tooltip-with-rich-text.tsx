import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverProps,
  PopoverContentProps,
  TooltipProps,
  useStyleConfig,
} from '@chakra-ui/react'
import React from 'react'

import { OPEN_DELAY_IN_MS } from 'src/components/Base/TooltipWithDelay/constants'

export interface TooltipWithRichTextProperties extends TooltipProps {
  children: PopoverProps['children']
  tooltip: PopoverContentProps['children']
}

const TooltipWithRichText = ({ children, tooltip, ...rest }: TooltipWithRichTextProperties) => {
  const styles = useStyleConfig('Tooltip', rest)

  return (
    <Popover trigger="hover" openDelay={OPEN_DELAY_IN_MS}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent sx={styles} {...rest}>
        {tooltip}
      </PopoverContent>
    </Popover>
  )
}

export default TooltipWithRichText
