import { Skeleton } from '@chakra-ui/react'
import React from 'react'

export const BoardSkeleton = ({ ...rest }) => {
  return <Skeleton lineHeight="1" width="52px" height="48px" {...rest} />
}
