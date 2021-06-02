import { Box, Stack } from '@chakra-ui/layout'
import { BoxProps } from '@chakra-ui/react'
import React from 'react'

import { TeamSectionHeading } from './SectionHeading/wrapper'

interface TeamSectionWrapperProperties extends BoxProps {
  title: string
}

export const TeamSectionWrapper = ({ title, ...rest }: TeamSectionWrapperProperties) => (
  <Stack spacing={4} maxH="md">
    <TeamSectionHeading>{title}</TeamSectionHeading>
    <Box
      p={2}
      bg="white"
      borderRadius="10"
      w="full"
      overflow="auto"
      boxShadow="md"
      borderColor="new_gray.200"
      borderWidth={1}
      {...rest}
    />
  </Stack>
)
