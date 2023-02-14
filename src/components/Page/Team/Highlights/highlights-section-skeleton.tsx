import { Grid, GridProps, Skeleton, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface HighlightsSectionSkeletonProperties {
  gridTemplate: GridProps['templateColumns']
  dataLenght: number
  title: string
}

const HighlightsSectionSkeleton = ({
  gridTemplate,
  dataLenght,
  title,
}: HighlightsSectionSkeletonProperties) => {
  const mockedArray = []

  for (let index = dataLenght; index > 0; index--) {
    mockedArray.push(Math.random())
  }

  return (
    <VStack>
      <Skeleton isLoaded={false}>
        <Text w="100%" fontSize={14} color="new-gray.800" fontWeight="medium">
          {title}
        </Text>
      </Skeleton>
      <Grid gap={3} w="100%" templateColumns={gridTemplate}>
        {mockedArray.map((_) => (
          <Skeleton key={Math.random()} isLoaded={false}>
            <VStack
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              height="80px"
              lineHeight="100%"
              borderRadius={9}
            />
          </Skeleton>
        ))}
      </Grid>
    </VStack>
  )
}

export default HighlightsSectionSkeleton
