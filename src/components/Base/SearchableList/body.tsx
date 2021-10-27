import { Stack } from '@chakra-ui/layout'
import React from 'react'

type SearchableListBodyProperties = {
  children: React.ReactNode
}

export const SearchableListBody = ({ children }: SearchableListBodyProperties) => (
  <Stack spacing={4} maxH="full">
    {children}
  </Stack>
)
