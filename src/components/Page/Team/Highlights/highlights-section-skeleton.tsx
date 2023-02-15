import { Box, Grid, GridProps, Skeleton, VStack } from '@chakra-ui/react'
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
      <Box width="100%">
        <Skeleton isLoaded={false} textAlign="left" w={240} h={6} borderRadius={4} />
      </Box>
      <Grid gap={3} w="100%" templateColumns={gridTemplate}>
        {mockedArray.map((_) => (
          <Skeleton key={Math.random()} isLoaded={false} borderRadius={9}>
            <VStack
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              height="80px"
              lineHeight="100%"
            />
          </Skeleton>
        ))}
      </Grid>
    </VStack>
  )
}

export default HighlightsSectionSkeleton
