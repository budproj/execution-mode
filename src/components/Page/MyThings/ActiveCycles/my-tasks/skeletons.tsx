import { Box, Skeleton, SkeletonCircle, Flex, Divider } from '@chakra-ui/react'
import React from 'react'

export interface SkeletonProperties {
  isLoaded: boolean
}

export const TaskSkeleton = ({ isLoaded }: SkeletonProperties) => {
  return (
    <Box mt={6}>
      <Flex alignItems="center">
        <Skeleton isLoaded={isLoaded} width="30px" height="30px" borderRadius={10} />
        <Skeleton isLoaded={isLoaded} ml={3} width="95%" height="20px" />
      </Flex>
      <Flex alignItems="center" pl={12} mt={3}>
        <Skeleton isLoaded={isLoaded} height="25px" width="25px" borderRadius={7} />
        <Skeleton isLoaded={isLoaded} ml={3} height="20px" width="80%" />
        <SkeletonCircle isLoaded={isLoaded} size="10" ml={3} />
      </Flex>
    </Box>
  )
}

export const TaskSkeletons = ({ isLoaded }: SkeletonProperties) => (
  <>
    <Divider mt="3.5rem" mb={10} borderColor="new-gray.400" opacity="1" />
    <TaskSkeleton isLoaded={isLoaded} />
    <Divider my={10} borderColor="new-gray.400" opacity="1" />
    <TaskSkeleton isLoaded={isLoaded} />
    <Divider my={10} borderColor="new-gray.400" opacity="1" />
    <TaskSkeleton isLoaded={isLoaded} />
    <Divider my={10} borderColor="new-gray.400" opacity="1" />
    <TaskSkeleton isLoaded={isLoaded} />
  </>
)
