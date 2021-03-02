import { Stack, FormLabel, StackProps, MenuProps, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

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
  isSubmitting?: boolean
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
  isSubmitting,
}: EditableSelectFieldProperties) => {
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const handleChange = (value: string | string[]) => {
    setWasSubmitted(true)
    if (onChange) onChange(value)
  }

  useEffect(() => {
    if (wasSubmitted && !isSubmitting) setWasSubmitted(false)
  }, [wasSubmitted, isSubmitting, setWasSubmitted])

  return (
    <Stack direction="column" w="full" spacing={0} flexGrow={flexGrow}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
      <Stack direction="row" alignItems="center" gridGap={2}>
        <EditableSelectValue
          isSubmitting
          value={value}
          placeholder={placeholder}
          customFallbackPlaceholder={customFallbackPlaceholder}
          isLoaded={isLoaded} // IsSubmitting && wasSubmitted}
          onChange={handleChange}
        >
          {children}
        </EditableSelectValue>
        {isSubmitting && wasSubmitted && <Spinner color="gray.200" size="sm" />}
      </Stack>
    </Stack>
  )
}

export default EditableSelectField
