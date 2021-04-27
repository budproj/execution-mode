import { Box, Text, Button, TextProps } from '@chakra-ui/react'
import React, { ComponentType, useState } from 'react'
import { useIntl } from 'react-intl'
import { v5 as uuidv5 } from 'uuid'

import { MAX_CHAR_LENGTH } from './constants'
import messages from './messages'

export interface ExpandableTextProperties {
  fontSize: TextProps['fontSize']
  maxCollapsedLength: number
  color: TextProps['color']
  Wrapper?: ComponentType<TextProps>
  text?: string
  fontWeight?: TextProps['fontWeight']
  transition?: TextProps['transition']
  py?: TextProps['py']
  borderWidth?: TextProps['borderWidth']
  borderColor?: TextProps['borderColor']
  onClickPreview?: () => void
  onMouseEnterPreview?: () => void
  onMouseLeavePreview?: () => void
}

const ExpandableText = ({
  text,
  fontSize,
  fontWeight,
  maxCollapsedLength,
  color,
  Wrapper = Text,
  transition,
  py,
  borderWidth,
  borderColor,
  onClickPreview,
  onMouseEnterPreview,
  onMouseLeavePreview,
}: ExpandableTextProperties) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const intl = useIntl()

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const isTruncatedText = typeof text !== 'undefined' && text.length > maxCollapsedLength
  const shouldTruncateText = !isTruncatedText || (isTruncatedText && isExpanded)

  const truncatedText = text?.slice(0, maxCollapsedLength) ?? ''
  const normalizedText =
    shouldTruncateText && typeof text !== 'undefined' ? text : `${truncatedText}...`

  const paragraphs = text ? normalizedText.split('\n') : []

  return (
    <Box>
      {paragraphs.map((paragraph) => (
        <Wrapper
          key={uuidv5(paragraph, uuidv5.URL)}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          transition={transition}
          py={py}
          borderWidth={borderWidth}
          borderColor={borderColor}
          _empty={{
            height: 4,
          }}
          onClick={onClickPreview}
          onMouseEnter={onMouseEnterPreview}
          onMouseLeave={onMouseLeavePreview}
        >
          {paragraph}
        </Wrapper>
      ))}
      {isTruncatedText && (
        <Button p={0} colorScheme="brand" fontWeight={400} onClick={toggleExpanded}>
          {intl.formatMessage(messages[isExpanded ? 'collapseButton' : 'expandButton'])}
        </Button>
      )}
    </Box>
  )
}

ExpandableText.defaultProps = {
  maxCollapsedLength: MAX_CHAR_LENGTH,
  fontSize: 'md',
  color: 'black.900',
}

export default ExpandableText
