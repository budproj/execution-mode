import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

const CycleFilterQuarterSelectorButton = (properties: ButtonProps) => (
  <Button
    bg="gray.50"
    color="gray.500"
    borderRadius={6}
    px={5}
    variant="solid"
    fontSize="xs"
    _active={{
      bg: 'brand.500',
      color: 'white',
    }}
    {...properties}
  />
)

export default CycleFilterQuarterSelectorButton
