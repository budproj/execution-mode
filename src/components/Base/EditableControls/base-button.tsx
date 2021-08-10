import { IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'

export const EditableButton = (properties: IconButtonProps) => (
  <IconButton
    variant="solid"
    h={12}
    w={12}
    fontSize="2xl"
    bg="black.100"
    color="gray.500"
    borderColor="transparent"
    {...properties}
  />
)
