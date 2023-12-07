import { Box } from '@chakra-ui/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { FormEventHandler } from 'react'

import MenuBar from './menu-bar'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: { 'data-testid': 'text-style' } }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]
const content = '<p>Hello World! 🌎️</p>'

interface EditorProperties {
  description: string
  onChange: FormEventHandler | undefined
  isParent: boolean
  editable: boolean
}

const Editor = ({ description, onChange, isParent, editable }: EditorProperties) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'content',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    content: description,
    editable,
  })

  return (
    <Box>
      {isParent && (
        <Box marginBottom={2} display="flex" alignItems="center" borderRadius="10px">
          <MenuBar />
        </Box>
      )}

      <EditorContent editor={editor} onChange={onChange} />
    </Box>
  )
}

export default Editor
