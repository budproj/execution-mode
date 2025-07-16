import { Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'

const AnswersRowSkeleton = () => {
  const mockedArray = []

  for (let index = 6; index > 0; index--) {
    mockedArray.push(Math.random())
  }

  return (
    <VStack gap={3}>
      {mockedArray.map((_) => (
        <Skeleton
          key={Math.random()}
          height="48px"
          backgroundColor="red"
          w="100%"
          borderRadius={8}
          isLoaded={false}
        />
      ))}
    </VStack>
  )
}

export default AnswersRowSkeleton
