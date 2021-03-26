import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const MyKeyResultsPageSwitcherSkeleton = () => (
  <Stack direction="column" spacing={4} borderBottomColor="black.100" borderBottomWidth={1}>
    <Skeleton w={32} h={21} />
    <Skeleton w={32} h={21} />
  </Stack>
)

export default MyKeyResultsPageSwitcherSkeleton
