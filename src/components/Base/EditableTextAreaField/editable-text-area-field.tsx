import { Stack, FormLabel, StackProps } from '@chakra-ui/react'
import React from 'react'

import EditableTextAreaValue from 'src/components/Base/EditableTextAreaValue'

export interface EditableTextAreaFieldProperties {
  label: string
  isLoaded?: boolean
  customFallbackValue?: string
  value?: string
  flexGrow?: StackProps['flexGrow']
}

const EditableTextAreaField = ({
  label,
  value,
  customFallbackValue,
  isLoaded,
  flexGrow,
}: EditableTextAreaFieldProperties) => {
  return (
    <Stack direciton="column" w="full" spacing={0} flexGrow={flexGrow}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
      <EditableTextAreaValue
        value={value}
        customFallbackValue={customFallbackValue}
        isLoaded={isLoaded}
      />
    </Stack>
  )
}

export default EditableTextAreaField
