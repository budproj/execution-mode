import { Stack, FormLabel, Text, StackProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface EditableFieldProperties extends StackProps {
  label: string
  value: string
  children?: ReactElement
}

const EditableField = ({ label, value, children, ...rest }: EditableFieldProperties) => (
  <Stack direciton="column" spacing={2} {...rest}>
    <FormLabel fontSize="sm" m={0}>
      {label}
    </FormLabel>
    <Text fontSize="md" color="black.900" fontWeight={400}>
      {children ?? value}
    </Text>
  </Stack>
)

EditableField.defaultProps = {
  value: '-',
}

export default EditableField
