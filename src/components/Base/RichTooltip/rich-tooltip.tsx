import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverProps,
  PopoverContentProps,
  TooltipProps,
  useTheme,
} from '@chakra-ui/react'
import React from 'react'

export interface RichTooltipProperties extends TooltipProps {
  children: PopoverProps['children']
  tooltip: PopoverContentProps['children']
}

const RichTooltip = ({ children, tooltip, ...rest }: RichTooltipProperties) => {
  const theme = useTheme()
  const styles = theme.components.Tooltip.baseStyle(rest)

  return (
    <Popover trigger="hover">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent {...styles}>{tooltip}</PopoverContent>
    </Popover>
  )
}

export default RichTooltip
