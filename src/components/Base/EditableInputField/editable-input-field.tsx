import { Stack, FormLabel, StackProps } from '@chakra-ui/react'
import React from 'react'

import EditableInputValue from 'src/components/Base/EditableInputValue'

export interface EditableInputFieldProperties {
  label: string
  isLoaded?: boolean
  customFallbackValue?: string
  value?: string
  flexGrow?: StackProps['flexGrow']
}

const EditableInputField = ({
  label,
  value,
  customFallbackValue,
  isLoaded,
  flexGrow,
}: EditableInputFieldProperties) => {
  return (
    <Stack direciton="column" w="full" spacing={0} flexGrow={flexGrow}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
      <EditableInputValue
        value={value}
        customFallbackValue={customFallbackValue}
        isLoaded={isLoaded}
      />
    </Stack>
  )
}

export default EditableInputField
