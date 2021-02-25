import { Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export interface SettingsAccountBodySectionTitle {
  title: string
  subtitle: string
}

const SettingsAccountBodySectionTitle = ({ title, subtitle }: SettingsAccountBodySectionTitle) => (
  <Stack direction="column" spacing={1}>
    <Heading as="h2" fontSize="xs" textTransform="uppercase" color="gray.500" fontWeight={700}>
      {title}
    </Heading>
    <Text fontSize="xs" color="gray.300" fontWeight={400}>
      {subtitle}
    </Text>
  </Stack>
)

export default SettingsAccountBodySectionTitle
