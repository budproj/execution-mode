import { Skeleton } from '@chakra-ui/react'
import React from 'react'

export const StackedProgressBarSkeleton = ({ ...rest }) => {
  return (
    <Skeleton
      lineHeight="1"
      width="100%"
      height="48px"
      borderRadius="18px"
      maxHeight="21px"
      mt="14px"
      {...rest}
    />
  )
}
