/* eslint-disable complexity */
/* eslint-disable unicorn/no-null */
import { Box, Button, Icon } from '@chakra-ui/react'
import { Editor } from '@tiptap/react'
import React, { useRef, useState } from 'react'
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiUnderline,
  RiStrikethrough2,
  RiParagraph,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiListUnordered,
  RiListOrdered,
  RiCodeBoxLine,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiArrowGoBackFill,
  RiArrowGoForwardFill,
  RiUsbLine,
  RiOilLine,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
  RiLineHeight,
  RiQuoteText,
  RiTableLine,
  RiTableFill,
  RiRoundedCorner,
} from 'react-icons/ri'

type MenuBarProperties = {
  editor: Editor | null
}

const menuBarIcon = ({ editor }: any) => [
  {
    id: 1,
    name: 'bold',
    icon: RiBold,
    onClick: () => editor.chain().focus().toggleBold().run(),
    disable: !editor.can().chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 2,
    name: 'italic',
    icon: RiItalic,
    onClick: () => editor.chain().focus().toggleItalic().run(),
    disable: !editor.can().chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 21,
    name: 'underline',
    icon: RiUnderline,
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    disable: false,
    isActive: editor.isActive('underline') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 3,
    name: 'strike',
    icon: RiStrikethrough2,
    onClick: () => editor.chain().focus().toggleStrike().run(),
    disable: !editor.can().chain().focus().toggleStrike().run(),
    isActive: editor.isActive('strike') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 4,
    name: 'code',
    icon: RiCodeBoxLine,
    onClick: () => editor.chain().focus().toggleCode().run(),
    disable: !editor.can().chain().focus().toggleCode().run(),
    isActive: editor.isActive('code') ? 'is-active text-green-700' : '',
    hover: false,
    split: true,
  },
  {
    id: 5,
    name: 'heading1',
    icon: RiH1,
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 1 }) ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 6,
    name: 'heading2',
    icon: RiH2,
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 2 }) ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 13,
    name: 'heading3',
    icon: RiH3,
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 3 }) ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 14,
    name: 'heading4',
    icon: RiH4,
    onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 4 }) ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 15,
    name: 'heading5',
    icon: RiH5,
    onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 5 }) ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 7,
    name: 'paragraph',
    icon: RiParagraph,
    onClick: () => editor.chain().focus().setParagraph().run(),
    disable: false,
    isActive: editor.isActive('paragraph') ? 'is-active text-green-700' : '',
    hover: false,
    split: true,
  },
  {
    id: 8,
    name: 'bullet list',
    icon: RiUsbLine,
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    disable: false,
    isActive: editor.isActive('bulletList') ? 'is-active text-green-700 list-disc' : '',
    hover: false,
    split: false,
  },
  {
    id: 9,
    name: 'ordered list',
    icon: RiOilLine,
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    disable: false,
    isActive: editor.isActive('orderedList') ? 'is-active text-green-700 list-decimal' : '',
    hover: false,
    split: false,
  },
  {
    id: 16,
    name: 'align left',
    icon: RiAlignLeft,
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    hover: false,
    split: false,
  },
  {
    id: 17,
    name: 'align center',
    icon: RiAlignCenter,
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'center' })
      ? 'is-active text-green-700 text-center'
      : '',
    hover: false,
    split: false,
  },
  {
    id: 18,
    name: 'align right',
    icon: RiAlignRight,
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    hover: false,
    split: false,
  },
  {
    id: 19,
    name: 'align justify',
    icon: RiAlignJustify,
    onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'justify' }) ? 'is-active' : '',
    hover: false,
    split: true,
  },
  {
    id: 20,
    name: 'highlight',
    icon: RiLineHeight,
    onClick: () => editor.chain().focus().toggleHighlight().run(),
    disable: false,
    isActive: editor.isActive('highlight') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 10,
    name: 'code block',
    icon: RiCodeBoxLine,
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    disable: false,
    isActive: editor.isActive('codeBlock') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 11,
    name: 'blockquote',
    icon: RiQuoteText,
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    disable: false,
    isActive: editor.isActive('blockquote') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 12,
    name: 'table',
    icon: RiTableLine,
    onClick: () =>
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    disable: false,
    isActive: editor.isActive('table') ? 'is-active text-green-700' : '',
    hover: true,
    split: true,
  },
  {
    id: 30,
    name: 'undo',
    icon: RiTableFill,
    onClick: () => editor.chain().focus().undo().run(),
    disable: !editor.can().undo(),
    isActive: editor.isActive('table') ? 'is-active text-green-700' : '',
    hover: false,
    split: false,
  },
  {
    id: 31,
    name: 'redo',
    icon: RiRoundedCorner,
    onClick: () => editor.chain().focus().redo().run(),
    disable: !editor.can().redo(),
    isActive: editor.isActive('table') ? 'is-active text-green-700' : '',
    hover: false,
    split: true,
  },
]

const MenuBar = ({ editor }: MenuBarProperties) => {
  const [open, setOpen] = useState<boolean>(true)
  const fileInputReference = useRef<HTMLInputElement>(null)

  if (!editor) {
    return null
  }

  const MenuBarIconValue = menuBarIcon({ editor })

  const handleIconClick = () => {
    fileInputReference.current?.click()
  }

  return (
    <Box>
      <input
        type="color"
        value={editor.getAttributes('textStyle').color}
        onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
      />
      <Button
        isDisabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Icon as={RiBold} />
      </Button>
      <Button
        isDisabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icon as={RiItalic} />
      </Button>
      <Button
        isDisabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icon as={RiStrikethrough} />
      </Button>
      <Button
        isDisabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Icon as={RiCodeSSlashLine} />
      </Button>
      {/* <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</Button>
      <Button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</Button> */}
      <Button
        isActive={editor.isActive('paragraph')}
        borderRadius={0}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Icon as={RiParagraph} />
      </Button>
      <Button
        isActive={editor.isActive('heading', { level: 1 })}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Icon as={RiH1} />
      </Button>
      <Button
        isActive={editor.isActive('heading', { level: 2 })}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Icon as={RiH2} />
      </Button>
      <Button
        isActive={editor.isActive('heading', { level: 3 })}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Icon as={RiH3} />
      </Button>
      <Button
        isActive={editor.isActive('heading', { level: 4 })}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Icon as={RiH4} />
      </Button>
      <Button
        isActive={editor.isActive('heading', { level: 5 })}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      >
        <Icon as={RiH5} />
      </Button>
      <Button
        isActive={editor.isActive('heading', { level: 6 })}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      >
        <Icon as={RiH6} />
      </Button>
      <Button
        isActive={editor.isActive('bulletList')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icon as={RiListUnordered} />
      </Button>
      <Button
        isActive={editor.isActive('orderedList')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icon as={RiListOrdered} />
      </Button>
      <Button
        isActive={editor.isActive('codeBlock')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Icon as={RiCodeBoxLine} />
      </Button>
      <Button
        isActive={editor.isActive('blockquote')}
        borderRadius={0}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Icon as={RiDoubleQuotesL} />
      </Button>
      <Button borderRadius={0} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Icon as={RiSeparator} />
      </Button>
      <Button borderRadius={0} onClick={() => editor.chain().focus().setHardBreak().run()}>
        <Icon as={RiTextWrap} />
      </Button>
      <Button
        isDisabled={!editor.can().chain().focus().undo().run()}
        borderRadius={0}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Icon as={RiArrowGoBackFill} />
      </Button>
      <Button
        isDisabled={!editor.can().chain().focus().redo().run()}
        borderRadius={0}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Icon as={RiArrowGoForwardFill} />
      </Button>
    </Box>
  )
}

export default MenuBar
