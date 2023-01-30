import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

const CheckInCheckListSkeleton = () => {
  return (
    <Flex px={2} gap={2}>
      <Skeleton isLoaded={false} borderRadius="50%" width={12} w="1.4em" h="1.4em" />
      <Skeleton isLoaded={false} w={12} h="1.4em" />
    </Flex>
  )
}

export default CheckInCheckListSkeleton
