import { Skeleton, InputGroup } from '@chakra-ui/react'
import { EditorEvents } from '@tiptap/react'
import { Field, useFormikContext } from 'formik'
import React, { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

interface DescriptionInputProperties {
  readonly isLoading?: boolean
  readonly hasValidationErrors?: boolean
}

const EditorInput = () => {
  const { setFieldValue, initialValues } = useFormikContext<FormValues>()

  const handleUpdate = useCallback(
    (parameters: EditorEvents['update']) => {
      const { editor } = parameters

      // TODO: a debounce would be nice here
      const timer = setTimeout(async () => setFieldValue('description', editor.getHTML()), 2500)
      return () => clearTimeout(timer)
    },
    [setFieldValue],
  )

  return <Editor editable content={initialValues.description} onUpdate={handleUpdate} />
}

export const DescriptionInput = ({
  isLoading,
  hasValidationErrors,
}: DescriptionInputProperties) => {
  const [hasBlurredInput, setHasBlurredInput] = useState(false)
  const [isFocused, setIsFocused] = useState(true)
  const intl = useIntl()
  const { values } = useFormikContext<FormValues>()

  const typedAnEmptyDescription = values.description.length === 0 && hasBlurredInput
  const isEmptyAfterValidation = values.description.length === 0 && hasValidationErrors
  const isInvalid = typedAnEmptyDescription || isEmptyAfterValidation

  const handleBlur = () => {
    if (!hasBlurredInput) setHasBlurredInput(true)
    if (isFocused) setIsFocused(false)
  }

  const handleFocus = () => {
    if (!isFocused) setIsFocused(true)
  }

  return (
    <FormInputBase required>
      <Skeleton isLoaded={!isLoading}>
        <InputGroup onBlurCapture={handleBlur} onFocusCapture={handleFocus}>
          <Field
            name="description"
            placeholder={intl.formatMessage(messages.secondInputPlaceholder)}
            _placeholder={{ color: 'black.400' }}
            component={EditorInput}
            fieldId="description"
            isInvalid={isInvalid}
          />
        </InputGroup>
      </Skeleton>
    </FormInputBase>
  )
}
