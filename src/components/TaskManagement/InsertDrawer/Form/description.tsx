import { Skeleton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'

import { FormInputBase } from './base-input'

interface DescriptionInputProperties {
  isLoading?: boolean
}

export const DescriptionInput = ({ isLoading }: DescriptionInputProperties) => {
  const intl = useIntl()
  const [content, setContent] = useState<string>('')
  const [editorText, setEditorText] = useState<string>('')

  const handleChange = (data: any) => {
    setContent(data)
  }

  return (
    <FormInputBase>
      <Skeleton isLoaded={!isLoading}>
        <Editor editable content={content} setContent={setContent} editorText={editorText} />
        {/* <Editor isParent={false} description={content} editable={false} /> */}
      </Skeleton>
    </FormInputBase>
  )
}
