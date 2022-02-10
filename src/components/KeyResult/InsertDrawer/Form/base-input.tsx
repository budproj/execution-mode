import { Box, BoxProps, FormLabel } from '@chakra-ui/react'
import React from 'react'

interface KeyResultInsertDrawerFormInputBaseProperties {
  title?: string
  children?: BoxProps['children']
}

export const FormInputBase = ({
  title,
  children,
}: KeyResultInsertDrawerFormInputBaseProperties) => (
  <Box w="full">
    <FormLabel>{title}</FormLabel>
    {children}
  </Box>
)
