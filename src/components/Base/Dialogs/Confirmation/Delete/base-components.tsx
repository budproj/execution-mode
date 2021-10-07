import { Button } from '@chakra-ui/button'
import { HeadingProps, Stack, Text } from '@chakra-ui/layout'
import { ButtonProps, Heading, StackProps, TextProps } from '@chakra-ui/react'
import React from 'react'

export const StyledAlertHeading = (properties: HeadingProps) => (
  <Heading
    as="h2"
    color="gray.500"
    fontWeight={500}
    fontSize="2xl"
    textAlign="center"
    px={8}
    {...properties}
  />
)

export const StyledAlertDescription = (properties: TextProps) => (
  <Text
    textAlign="center"
    fontWeight={400}
    color="gray.400"
    fontSize="lg"
    px={16}
    {...properties}
  />
)

export const StyledAlertConfirmationButton = (properties: ButtonProps) => (
  <Button variant="solid" colorScheme="red" {...properties} />
)

export const StyledAlertCancelButton = (properties: ButtonProps) => (
  <Button variant="text" colorScheme="brand" {...properties} />
)

export const StyledAlertActionArea = (properties: StackProps) => (
  <Stack spacing={2} w="full" {...properties} />
)
