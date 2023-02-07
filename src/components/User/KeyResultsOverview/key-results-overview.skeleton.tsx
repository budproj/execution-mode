import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'

import { UpdateIcon } from 'src/components/KeyResult/List/Body/Columns/KeyResult/update-icon'

const KeyResultsOverviewSkeleton = () => {
  return (
    <HStack gap={2}>
      <Skeleton isLoaded={false} borderRadius="50%" w="3.2em" h="3.2em" />
      <VStack width="100%" maxW={52}>
        <Flex w="100%" gap={4} justifyContent="space-between">
          <Skeleton isLoaded={false} h={4} w={28} />
          <Skeleton isLoaded={false} h={4} w={8} />
        </Flex>
        <Skeleton isLoaded={false} w="100%" h={4} borderRadius="full" />
        <Flex alignItems="center" width="100%" gap={2}>
          <Skeleton isLoaded={false} h={4} borderRadius="50%">
            <UpdateIcon isOutdated={undefined} updateTextColor="random text" />
          </Skeleton>
          <Skeleton isLoaded={false} h={4} w={32} />
        </Flex>
      </VStack>
      <Skeleton isLoaded={false} h={6} w={12} borderRadius={5} />
    </HStack>
  )
}

export default KeyResultsOverviewSkeleton
