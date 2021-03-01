import { Stack, FormLabel, StackProps, MenuProps } from '@chakra-ui/react'
import React from 'react'

import EditableSelectValue from 'src/components/Base/EditableSelectValue'

export interface EditableSelectFieldProperties {
  label: string
  onChange: (value: string | string[]) => void
  isLoaded?: boolean
  customFallbackPlaceholder?: string
  value?: string
  placeholder?: string
  children?: MenuProps['children']
  flexGrow?: StackProps['flexGrow']
}

const EditableSelectField = ({
  label,
  value,
  children,
  placeholder,
  customFallbackPlaceholder,
  isLoaded,
  flexGrow,
  onChange,
}: EditableSelectFieldProperties) => {
  return (
    <Stack direction="column" w="full" spacing={0} flexGrow={flexGrow}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
      <EditableSelectValue
        value={value}
        placeholder={placeholder}
        customFallbackPlaceholder={customFallbackPlaceholder}
        isLoaded={isLoaded}
        onChange={onChange}
      >
        {children}
      </EditableSelectValue>
    </Stack>
  )
}

export default EditableSelectField
