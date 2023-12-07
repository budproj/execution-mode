/* eslint-disable unicorn/no-null */
import { Box, Button, Icon } from '@chakra-ui/react'
import { useCurrentEditor } from '@tiptap/react'
import React from 'react'
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
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
} from 'react-icons/ri'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Box>
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
