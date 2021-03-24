import { Stack, StackProps, useTheme } from '@chakra-ui/react'
import React from 'react'

export interface RouteTabsProperties {
  children: StackProps['children']
}

const RouteTabs = ({ children }: RouteTabsProperties) => {
  const { colors } = useTheme()

  return (
    <Stack direction="row" boxShadow={`inset 0 -2px ${colors.black[100] as string}`} w="full">
      {children}
    </Stack>
  )
}

export default RouteTabs
