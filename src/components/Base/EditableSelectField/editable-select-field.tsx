import { Stack, FormLabel, StackProps, Spinner } from '@chakra-ui/react'
import React, { ReactNode, useEffect, useState } from 'react'

import EditableSelectValue from 'src/components/Base/EditableSelectValue'

export interface EditableSelectFieldProperties {
  label: string
  onChange: (value: string | string[]) => void
  isLoaded?: boolean
  customFallbackPlaceholder?: string
  value?: string
  placeholder?: string
  children?: ReactNode
  flexGrow?: StackProps['flexGrow']
  isSubmitting?: boolean
  isDisabled?: boolean
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
  isDisabled,
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
      <FormLabel fontSize="md" m={0}>
        {label}
      </FormLabel>
      <Stack direction="row" alignItems="center" gridGap={2}>
        <EditableSelectValue
          isSubmitting={isSubmitting && wasSubmitted}
          value={value}
          placeholder={placeholder}
          customFallbackPlaceholder={customFallbackPlaceholder}
          isLoaded={isLoaded}
          isDisabled={isDisabled}
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
