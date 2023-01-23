import { GridItem, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'

type lastRetrospectiveAnswerSkeletonProperties = {
  numberOfElements: number
}

const LastRetrospectiveAnswerSkeleton = ({
  numberOfElements,
}: lastRetrospectiveAnswerSkeletonProperties) => {
  const mockedArray = []

  for (let index = numberOfElements; index > 0; index--) {
    mockedArray.push(Math.random())
  }

  return (
    <GridItem gap="15px" display="flex" color="new-gray.800">
      {mockedArray.map((_) => (
        <VStack key={Math.random()}>
          <Skeleton isLoaded={false} borderRadius="50%" width="1.8rem" height="1.8rem" />
          <Skeleton isLoaded={false} h={4} width={2} />
        </VStack>
      ))}
    </GridItem>
  )
}

export default LastRetrospectiveAnswerSkeleton
