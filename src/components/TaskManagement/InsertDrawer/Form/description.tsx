import { Skeleton } from '@chakra-ui/react'
import { EditorEvents } from '@tiptap/react'
import { Field, useFormikContext } from 'formik'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

interface DescriptionInputProperties {
  isLoading?: boolean
}

const EditorInput = () => {
  const { setFieldValue, initialValues } = useFormikContext<FormValues>()

  const handleUpdate = useCallback(
    (parameters: EditorEvents['update']) => {
      const { editor } = parameters
      // TODO: a debounce would be nice here
      const timer = setTimeout(() => setFieldValue('description', editor.getHTML()), 2500)
      return () => clearTimeout(timer)
    },
    [setFieldValue],
  )

  return <Editor editable content={initialValues.description} onUpdate={handleUpdate} />
}

export const DescriptionInput = ({ isLoading }: DescriptionInputProperties) => {
  const intl = useIntl()

  return (
    <FormInputBase>
      <Skeleton isLoaded={!isLoading}>
        <Field
          name="description"
          placeholder={intl.formatMessage(messages.secondInputPlaceholder)}
          _placeholder={{ color: 'black.400' }}
          component={EditorInput}
        />
      </Skeleton>
    </FormInputBase>
  )
}
