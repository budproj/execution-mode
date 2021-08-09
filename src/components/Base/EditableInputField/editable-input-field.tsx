import { Stack, FormLabel, StackProps, EditableProps, Spinner } from '@chakra-ui/react'
import React, { KeyboardEvent, useEffect, useState } from 'react'

import EditableInputValue from 'src/components/Base/EditableInputValue'

export interface EditableInputFieldProperties {
  label?: string
  customFallbackValue?: string
  value?: string
  flexGrow?: StackProps['flexGrow']
  onSubmit?: EditableProps['onSubmit']
  isLoaded?: boolean
  isSubmitting?: boolean
  isWaiting?: boolean
  startWithEditView?: boolean
  autoFocus?: boolean
  isDisabled?: boolean
  onPressedEnter?: (value?: string) => void
  onStartEdit?: () => void
  onStopEdit?: () => void
  onCancel?: (oldValue?: string) => void
  hideControls?: boolean
}

const EditableInputField = ({
  label,
  value,
  customFallbackValue,
  flexGrow,
  onSubmit,
  isLoaded,
  isSubmitting,
  isWaiting,
  startWithEditView,
  autoFocus,
  isDisabled,
  onPressedEnter,
  onStartEdit,
  onStopEdit,
  onCancel,
  hideControls,
}: EditableInputFieldProperties) => {
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const handleSubmit = (value: string) => {
    setWasSubmitted(true)
    if (onSubmit) onSubmit(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isDisabled && event.key === 'Enter' && onPressedEnter)
      onPressedEnter(event.currentTarget.value)
  }

  const isBeingSubmitted = isSubmitting && wasSubmitted

  useEffect(() => {
    if (wasSubmitted && !isSubmitting) setWasSubmitted(false)
  }, [wasSubmitted, isSubmitting, setWasSubmitted])

  return (
    <Stack direciton="column" w="full" spacing={0} flexGrow={flexGrow}>
      {Boolean(label) ?? (
        <FormLabel fontSize="sm" m={0}>
          {label}
        </FormLabel>
      )}
      <Stack direction="row" alignItems="center" gridGap={2}>
        <EditableInputValue
          value={value}
          customFallbackValue={customFallbackValue}
          isLoaded={isLoaded}
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          isSubmitting={isBeingSubmitted || isWaiting}
          startWithEditView={startWithEditView}
          autoFocus={autoFocus}
          isDisabled={isDisabled}
          hideControls={hideControls}
          onCancel={onCancel}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          onStartEdit={onStartEdit}
          onStopEdit={onStopEdit}
        />
        {(isBeingSubmitted || isWaiting) && <Spinner color="gray.200" size="sm" />}
      </Stack>
    </Stack>
  )
}

export default EditableInputField
