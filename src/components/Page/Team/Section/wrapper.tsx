import { Box, Stack } from '@chakra-ui/layout'
import { BoxProps } from '@chakra-ui/react'
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
      boxShadow="md"
      borderColor="new_gray.200"
      borderWidth={1}
      p={6}
      {...rest}
    >
      {children}
    </Box>
  </Stack>
)
