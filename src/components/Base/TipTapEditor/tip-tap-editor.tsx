import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Gapcursor from '@tiptap/extension-gapcursor'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { common, createLowlight } from 'lowlight'
import React, { useEffect } from 'react'

import MenuBar from './menu-bar'

const CustomEditor = styled(EditorContent)`
  /* Basic editor styles */
  .ProseMirror {
    outline: none;
    min-height: 200px;
    padding: 20px 20px;
    > * + * {
      margin-top: ;
    }

    img {
      max-width: 500px;
      max-height: 500px;

      &.ProseMirror-selectednode {
        outline: 3px solid #000000;
      }
    }

    ul,
    ol {
      padding: 0 20px;
    }

    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 1.5em;
    }
    h3 {
      font-size: 1.17em;
    }
    h4 {
      font-size: 1em;
    }
    h5 {
      font-size: 0.83em;
    }
    h6 {
      font-size: 0.67em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
      font-weight: bold;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
      .hljs-comment,
      .hljs-quote {
        color: #616161;
      }

      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f98181;
      }

      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #fbbc88;
      }

      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #b9f18d;
      }

      .hljs-title,
      .hljs-section {
        color: #faf594;
      }

      .hljs-keyword,
      .hljs-selector-tag {
        color: #70cff8;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: 700;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }

    mark {
      background-color: #faf594;
    }

    //  table
    table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      td,
      th {
        border: 2px solid #ced4da;
        box-sizing: border-box;
        min-width: 1em;
        padding: 3px 5px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: #f1f3f5;
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: rgba(200, 200, 255, 0.4);
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: #adf;
        bottom: -2px;
        position: absolute;
        right: -2px;
        pointer-events: none;
        top: 0;
        width: 4px;
      }

      p {
        margin: 0;
      }
    }
  }

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
`

const TableMenu = ({ editor }: any) => [
  {
    id: 1,
    name: 'Insert Table',
    action: () =>
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    id: 2,
    name: 'Add Column Before',
    action: () => editor.chain().focus().addColumnBefore().run(),
  },
  {
    id: 3,
    name: 'Add Column After',
    action: () => editor.chain().focus().addColumnAfter().run(),
  },
  {
    id: 4,
    name: 'Delete Column',
    action: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    id: 5,
    name: 'Add Row Before',
    action: () => editor.chain().focus().addRowBefore().run(),
  },
  {
    id: 6,
    name: 'Add Row After',
    action: () => editor.chain().focus().addRowAfter().run(),
  },
  {
    id: 7,
    name: 'Delete Row',
    action: () => editor.chain().focus().deleteRow().run(),
  },
  {
    id: 8,
    name: 'Delete Table',
    action: () => editor.chain().focus().deleteTable().run(),
  },
  {
    id: 9,
    name: 'Merge Cells',
    action: () => editor.chain().focus().mergeCells().run(),
  },
  {
    id: 11,
    name: 'Toggle Header Column',
    action: () => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    id: 12,
    name: 'Toggle Header Row',
    action: () => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    id: 13,
    name: 'Toggle Header Cell',
    action: () => editor.chain().focus().toggleHeaderCell().run(),
  },
  {
    id: 14,
    name: 'Merge Or Split',
    action: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    id: 15,
    name: 'Set Cell Attribute',
    action: () => editor.chain().focus().setCellAttribute('colspan', 2).run(),
  },
]

interface EditorProperties {
  content: string
  setContent: (content: string) => void
  editorText: string
  editable: boolean
}

const Editor = ({ content, setContent, editorText, editable = false }: EditorProperties) => {
  const lowlight = createLowlight(common)
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class: 'm-2 focus:outline-none',
      },
    },
    content,
    editable,
  })

  useEffect(() => {
    if (editor && editorText) {
      editor.chain().focus().insertContent(editorText).insertContent(`<br />`).run()
    }
  }, [editorText, editor])

  useEffect(() => {
    editor?.chain().focus().insertContent(content).run()
  }, [content, editor])

  return (
    <Box>
      <Box marginBottom={2} alignItems="center">
        <MenuBar editor={editor} isEditable={editable} />
      </Box>

      <CustomEditor
        editor={editor}
        style={{ border: editable ? '2px #D9E2F6 solid' : 'none', borderRadius: 4 }}
      />
    </Box>
  )
}

export default Editor
