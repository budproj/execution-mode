import { Box, Stack, BoxProps } from '@chakra-ui/react'
import React from 'react'

import { TeamSectionHeading } from './SectionHeading/wrapper'

interface TeamSectionWrapperProperties extends BoxProps {
  title: string
}

export const TeamSectionWrapper = ({ title, children, ...rest }: TeamSectionWrapperProperties) => (
  <Stack spacing={4} maxH="md">
    <TeamSectionHeading>{title}</TeamSectionHeading>
    <Box
      bg="white"
      borderRadius="10"
      w="full"
      overflowY="hidden"
      boxShadow="for-background.light"
      p={6}
      {...rest}
    >
      {children}
    </Box>
  </Stack>
)
