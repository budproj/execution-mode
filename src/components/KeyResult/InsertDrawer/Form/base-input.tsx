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
    <FormLabel
      textTransform="uppercase"
      color="gray.500"
      fontWeight="bold"
      fontSize={12}
      letterSpacing="0.5px"
    >
      {title}
    </FormLabel>
    {children}
  </Box>
)
