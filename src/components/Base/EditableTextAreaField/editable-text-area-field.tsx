import { Stack, FormLabel, StackProps, Spinner, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import EditableTextAreaValue from 'src/components/Base/EditableTextAreaValue'

export interface EditableTextAreaFieldProperties {
  label: string
  isLoaded?: boolean
  customFallbackValue?: string
  value?: string
  flexGrow?: StackProps['flexGrow']
  onSubmit?: (value: string) => void
  isSubmitting?: boolean
}

const EditableTextAreaField = ({
  label,
  value,
  customFallbackValue,
  isLoaded,
  flexGrow,
  isSubmitting,
  onSubmit,
}: EditableTextAreaFieldProperties) => {
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setWasSubmitted(true)
    if (onSubmit) onSubmit(event.target.value)
  }

  useEffect(() => {
    if (wasSubmitted && !isSubmitting) setWasSubmitted(false)
  }, [wasSubmitted, isSubmitting, setWasSubmitted])

  return (
    <Stack direciton="column" w="full" spacing={0} flexGrow={flexGrow}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
      <Stack direction="row" alignItems="flex-start" gridGap={2}>
        <EditableTextAreaValue
          value={value}
          customFallbackValue={customFallbackValue}
          isLoaded={isLoaded}
          isSubmitting={isSubmitting && wasSubmitted}
          onBlur={handleBlur}
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
