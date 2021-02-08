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
}

const ExpandableText = ({ text, fontSize, maxCollapsedLength }: ExpandableTextProperties) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const intl = useIntl()

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const isTruncatedText = text.length > maxCollapsedLength

  const truncatedText = text.slice(0, maxCollapsedLength)
  const normalizedText = isTruncatedText && isExpanded ? text : `${truncatedText}...`

  const paragraphs = normalizedText.split('\n')

  return (
    <Box>
      {paragraphs.map((paragraph) => (
        <Text key={uuidv5(paragraph, uuidv5.URL)} fontSize={fontSize}>
          {paragraph}
        </Text>
      ))}
      {isTruncatedText && (
        <Button
          p={0}
          color="cyan.500"
          fontWeight={400}
          _hover={{ color: 'cyan.300' }}
          onClick={toggleExpanded}
        >
          {intl.formatMessage(messages[isExpanded ? 'collapseButton' : 'expandButton'])}
        </Button>
      )}
    </Box>
  )
}

ExpandableText.defaultProps = {
  maxCollapsedLength: MAX_CHAR_LENGTH,
  fontSize: 'md',
}

export default ExpandableText
