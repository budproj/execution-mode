import { Skeleton, Flex, Box } from '@chakra-ui/react'
import React from 'react'

export const OverviewSummarySkeleton = () => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Box>
          <Flex>
            <Skeleton h="40px" w="400px" />
            <Skeleton h="40px" w="60px" ml={3} />
          </Flex>
          <Skeleton h="15px" w="300px" mt={3} />
        </Box>
        <Box>
          <Skeleton h="40px" w="80px" />
          <Skeleton h="20px" w="80px" mt={2} />
        </Box>
      </Flex>
      <Skeleton h="20px" w="100%" mt={6} borderRadius="2xl" />
    </>
  )
}
