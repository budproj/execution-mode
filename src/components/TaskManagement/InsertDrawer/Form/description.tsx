import { Skeleton } from '@chakra-ui/react'
import { useCurrentEditor } from '@tiptap/react'
import React from 'react'
import { useIntl } from 'react-intl'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'

import { FormInputBase } from './base-input'

interface DescriptionInputProperties {
  isLoading?: boolean
}

export const DescriptionInput = ({ isLoading }: DescriptionInputProperties) => {
  const intl = useIntl()
  const { editor } = useCurrentEditor()

  const editorJson = editor?.getJSON()
  console.log({ editor })

  return (
    <FormInputBase>
      <Skeleton isLoaded={!isLoading}>
        <Editor />
        {editor && <pre>{JSON.stringify(editor.getJSON(), undefined, 2)}</pre>}
      </Skeleton>
    </FormInputBase>
  )
}
