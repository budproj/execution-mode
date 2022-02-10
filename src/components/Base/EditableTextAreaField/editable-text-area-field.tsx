import { Stack, FormLabel, StackProps, Spinner, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import EditableTextAreaValue from 'src/components/Base/EditableTextAreaValue'

export interface EditableTextAreaFieldProperties {
  label: string
  isLoaded?: boolean
  customFallbackValue?: string
  value?: string
  flexGrow?: StackProps['flexGrow']
  onSubmit?: (value?: string) => void
  isSubmitting?: boolean
  isDisabled?: boolean
}

const EditableTextAreaField = ({
  label,
  value,
  customFallbackValue,
  isLoaded,
  flexGrow,
  isSubmitting,
  onSubmit,
  isDisabled,
}: EditableTextAreaFieldProperties) => {
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const isEmpty = !value || value === ''
  const handleSave = (value?: string) => {
    setWasSubmitted(true)
    if (onSubmit) onSubmit(value)
  }

  useEffect(() => {
    if (wasSubmitted && !isSubmitting) setWasSubmitted(false)
  }, [wasSubmitted, isSubmitting, setWasSubmitted])

  // eslint-disable-next-line unicorn/no-null
  return isDisabled && isEmpty ? null : (
    <Stack direction="column" w="full" spacing={0} flexGrow={flexGrow}>
      <FormLabel fontSize="md" m={0}>
        {label}
      </FormLabel>
      <Stack direction="row" alignItems="flex-start" gridGap={2}>
        <EditableTextAreaValue
          value={value}
          customFallbackValue={customFallbackValue}
          isLoaded={isLoaded}
          isDisabled={isDisabled}
          isSubmitting={isSubmitting && wasSubmitted}
          onSave={handleSave}
        />
        {isSubmitting && wasSubmitted && (
          <Box pt={2}>
            <Spinner color="gray.200" size="sm" />
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export default EditableTextAreaField
