import { Box, Stack, BoxProps } from '@chakra-ui/react'
import React from 'react'

import { TeamSectionHeading } from './SectionHeading/wrapper'

interface TeamSectionWrapperProperties extends BoxProps {
  title: string
}

export const TeamSectionWrapper = ({ title, children, ...rest }: TeamSectionWrapperProperties) => (
  <Stack spacing={4} flex="1">
    <TeamSectionHeading fontSize="14px">{title}</TeamSectionHeading>
    <Box
      bg="white"
      borderRadius="10"
      w="full"
      overflowY="hidden"
      boxShadow="for-background.light"
      p="16px"
      {...rest}
    >
      {children}
    </Box>
  </Stack>
)
