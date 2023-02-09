import { GridItem, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'

type lastRetrospectiveAnswerSkeletonProperties = {
  numberOfElements?: number
}

const LastRetrospectiveAnswerSkeleton = ({
  numberOfElements = 3,
}: lastRetrospectiveAnswerSkeletonProperties) => {
  const mockedArray = []

  for (let index = numberOfElements; index > 0; index--) {
    mockedArray.push(Math.random())
  }

  return (
    <GridItem gap="15px" display="flex" color="new-gray.800">
      {mockedArray.map((_) => (
        <VStack key={Math.random()}>
          <Skeleton isLoaded={false} borderRadius="50%" width="25px" height="25px" />
          <Skeleton isLoaded={false} h="12px" width="10px" />
        </VStack>
      ))}
    </GridItem>
  )
}

export default LastRetrospectiveAnswerSkeleton
