import { Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export interface UserProfileBodySectionTitle {
  title: string
  subtitle?: string
}

export const UserProfileSectionTitle = ({ title, subtitle }: UserProfileBodySectionTitle) => (
  <Stack direction="column" spacing={1}>
    <Heading as="h2" fontSize="sm" textTransform="uppercase" color="new-gray.800" fontWeight={700}>
      {title}
    </Heading>
    {subtitle && (
      <Text fontSize="sm" color="gray.300" fontWeight={400}>
        {subtitle}
      </Text>
    )}
  </Stack>
)
