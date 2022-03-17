import { Skeleton, Stack, useTheme } from '@chakra-ui/react'
import React from 'react'

const PageSwitcherSkeleton = () => {
  const { colors } = useTheme()

  return (
    <Stack
      direction="row"
      spacing={4}
      boxShadow={`inset 0 -2px ${colors.black[100] as string}`}
      pb={4}
    >
      <Skeleton w={44} h={21} />
      <Skeleton w={44} h={21} />
    </Stack>
  )
}

export default PageSwitcherSkeleton
