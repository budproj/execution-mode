import { Box, BoxProps, Flex, FormLabel } from '@chakra-ui/react'
import React from 'react'

interface KeyResultInsertDrawerFormInputBaseProperties {
  title?: string
  required?: boolean
  children?: BoxProps['children']
}

export const FormInputBase = ({
  title,
  required = false,
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
      <Flex>
        {title}
        {required && <p style={{ color: '#FF616A' }}>*</p>}
      </Flex>
    </FormLabel>
    {children}
  </Box>
)
