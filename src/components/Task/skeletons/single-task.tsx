import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

interface SingleTaskSkeletonProperties {
  repeat?: number
}

export const SingleTaskSkeleton = ({ repeat = 1 }: SingleTaskSkeletonProperties) => {
  const loopTrough = new Array(repeat).fill(0)

  return (
    <>
      {[...loopTrough.keys()].map((key) => (
        <Flex key={key} alignItems="center" mb={2}>
          <Skeleton height="26px" width="26px" mr={2} borderRadius="lg" />
          <Skeleton height="25px" width="100%" />
        </Flex>
      ))}
    </>
  )
}
