import { Input, Skeleton } from '@chakra-ui/react'
import { EditorEvents } from '@tiptap/react'
import { Field, FieldProps } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'

import { FormInputBase } from './base-input'
import messages from './messages'

interface DescriptionInputProperties {
  isLoading?: boolean
}

export const DescriptionInput = ({ isLoading }: DescriptionInputProperties) => {
  const intl = useIntl()

  const [editorText, setEditorText] = useState<string>('')

  const handleUpdate = (parameters: EditorEvents['update']) => {
    const { editor } = parameters
    setEditorText(editor.getHTML())
  }

  return (
    <FormInputBase>
      <Skeleton isLoaded={!isLoading}>
        <Field
          name="description"
          as={Input}
          placeholder={intl.formatMessage(messages.secondInputPlaceholder)}
          _placeholder={{ color: 'black.400' }}
        >
          {({ field: { value }, form: { setValues } }: FieldProps) => {
            return <Editor editable content={value} onUpdate={handleUpdate} />
          }}
        </Field>
      </Skeleton>
    </FormInputBase>
  )
}
