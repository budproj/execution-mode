import { Box, Text, Button, TextProps } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { v5 as uuidv5 } from 'uuid'

import { MAX_CHAR_LENGTH } from './constants'
import messages from './messages'

export interface ExpandableTextProperties {
  text: string
  fontSize: TextProps['fontSize']
  maxCollapsedLength: number
  color: TextProps['color']
}

const ExpandableText = ({
  text,
  fontSize,
  maxCollapsedLength,
  color,
}: ExpandableTextProperties) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const intl = useIntl()

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const isTruncatedText = text.length > maxCollapsedLength
  const shouldTruncateText = !isTruncatedText || (isTruncatedText && isExpanded)

  const truncatedText = text.slice(0, maxCollapsedLength)
  const normalizedText = shouldTruncateText ? text : `${truncatedText}...`

  const paragraphs = normalizedText.split('\n')

  return (
    <Box>
      {paragraphs.map((paragraph) => (
        <Text
          key={uuidv5(paragraph, uuidv5.URL)}
          fontSize={fontSize}
          color={color}
          _empty={{
            height: 4,
          }}
        >
          {paragraph}
        </Text>
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
  color: 'gray.900',
}

export default ExpandableText
