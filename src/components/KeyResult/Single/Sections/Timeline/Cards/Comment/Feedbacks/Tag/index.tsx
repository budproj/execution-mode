import { HStack, StyleProps, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

import { COMMENT_TYPE } from 'src/components/KeyResult/constants'

export const iconsUrls = {
  [COMMENT_TYPE.SUGGESTION]: '/images/suggestion.png',
  [COMMENT_TYPE.PRAISAL]: '/images/praisal.png',
  [COMMENT_TYPE.QUESTION]: '/images/question.png',
  [COMMENT_TYPE.ALIGNMENT]: '/images/alignment.png',
  [COMMENT_TYPE.IMPROVEMENT]: '/images/improvement.png',
  [COMMENT_TYPE.ISSUE]: '/images/issue.png',
  [COMMENT_TYPE.COMMENT]: '',
}

export const tagTitle = {
  [COMMENT_TYPE.SUGGESTION]: 'SUGESTÃO',
  [COMMENT_TYPE.PRAISAL]: 'PARABÉNS',
  [COMMENT_TYPE.QUESTION]: 'DÚVIDA',
  [COMMENT_TYPE.ALIGNMENT]: 'ALINHAMENTO',
  [COMMENT_TYPE.IMPROVEMENT]: 'MELHORIA',
  [COMMENT_TYPE.ISSUE]: 'PROBLEMA',
  [COMMENT_TYPE.COMMENT]: 'COMENTÁRIO',
}

export const tagColor = {
  [COMMENT_TYPE.SUGGESTION]: 'blue.500',
  [COMMENT_TYPE.PRAISAL]: 'green.600',
  [COMMENT_TYPE.QUESTION]: 'yellow.600',
  [COMMENT_TYPE.ALIGNMENT]: 'new-gray.700',
  [COMMENT_TYPE.IMPROVEMENT]: 'brand.500',
  [COMMENT_TYPE.ISSUE]: 'red.500',
  [COMMENT_TYPE.COMMENT]: 'new-gray.800',
}

export const backgroundColor = new Map([
  [COMMENT_TYPE.SUGGESTION, 'blue.50'],
  [COMMENT_TYPE.ALIGNMENT, 'gray.50'],
  [COMMENT_TYPE.IMPROVEMENT, 'brand.50'],
  [COMMENT_TYPE.PRAISAL, 'green.50'],
  [COMMENT_TYPE.QUESTION, 'yellow.50'],
  [COMMENT_TYPE.ISSUE, 'red.50'],
  [COMMENT_TYPE.COMMENT, ''],
])

export const borderColor = new Map([
  [COMMENT_TYPE.SUGGESTION, 'blue.300'],
  [COMMENT_TYPE.ALIGNMENT, 'gray.300'],
  [COMMENT_TYPE.IMPROVEMENT, 'brand.300'],
  [COMMENT_TYPE.PRAISAL, 'green.300'],
  [COMMENT_TYPE.QUESTION, 'yellow.300'],
  [COMMENT_TYPE.ISSUE, 'red.500'],
  [COMMENT_TYPE.COMMENT, 'new-gray.800'],
])

interface CommentFeedbackTagProperties extends StyleProps {
  type?: COMMENT_TYPE
}

const CommentFeedbackTag = ({ type, ...rest }: CommentFeedbackTagProperties) => {
  const icon = type ? iconsUrls[type] : ''
  const text = type ? tagTitle[type] : ''
  const hasIcon = type !== COMMENT_TYPE.COMMENT
  const color = type ? tagColor[type] : ''

  return (
    <HStack fontSize={12} fontWeight="bold" {...rest}>
      {hasIcon && <Image src={icon} alt="asdsa" width={22} height={22} />}
      <Text fontSize="inherit" color={color}>
        {text}
      </Text>
    </HStack>
  )
}

export default CommentFeedbackTag
