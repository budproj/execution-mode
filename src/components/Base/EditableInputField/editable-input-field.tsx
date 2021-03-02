import { Stack, FormLabel, StackProps, EditableProps, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import EditableInputValue from 'src/components/Base/EditableInputValue'

export interface EditableInputFieldProperties {
  label: string
  customFallbackValue?: string
  value?: string
  flexGrow?: StackProps['flexGrow']
  onSubmit?: EditableProps['onSubmit']
  isLoaded?: boolean
  isSubmitting?: boolean
}

const EditableInputField = ({
  label,
  value,
  customFallbackValue,
  flexGrow,
  onSubmit,
  isLoaded,
  isSubmitting,
}: EditableInputFieldProperties) => {
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const handleSubmit = (value: string) => {
    setWasSubmitted(true)
    if (onSubmit) onSubmit(value)
  }

  useEffect(() => {
    if (wasSubmitted && !isSubmitting) setWasSubmitted(false)
  }, [wasSubmitted, isSubmitting, setWasSubmitted])

  return (
    <Stack direciton="column" w="full" spacing={0} flexGrow={flexGrow}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
      <Stack direction="row" alignItems="center" gridGap={2}>
        <EditableInputValue
          value={value}
          customFallbackValue={customFallbackValue}
          isLoaded={isLoaded}
          isSubmitting={isSubmitting && wasSubmitted}
          onSubmit={handleSubmit}
        />
        {isSubmitting && wasSubmitted && <Spinner color="gray.200" size="sm" />}
      </Stack>
    </Stack>
  )
}

export default EditableInputField
