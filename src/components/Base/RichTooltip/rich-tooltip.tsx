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

export interface RichTooltipProperties extends TooltipProps {
  children: PopoverProps['children']
  tooltip: PopoverContentProps['children']
}

const RichTooltip = ({ children, tooltip, ...rest }: RichTooltipProperties) => {
  const styles = useStyleConfig('Tooltip', rest)

  return (
    <Popover trigger="hover">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent sx={styles}>{tooltip}</PopoverContent>
    </Popover>
  )
}

export default RichTooltip
