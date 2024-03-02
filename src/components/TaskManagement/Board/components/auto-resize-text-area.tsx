import { Textarea, TextareaProps } from '@chakra-ui/react'
import React from 'react'
import ResizeTextarea from 'react-textarea-autosize'

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (properties, reference) => {
    return <Textarea ref={reference} as={ResizeTextarea} minH="unset" {...properties} />
  },
)

export default AutoResizeTextarea
