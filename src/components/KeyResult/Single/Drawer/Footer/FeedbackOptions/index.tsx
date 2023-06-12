import { MenuItemOption, useToken } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { SelectMenu } from 'src/components/Base'
import { COMMENT_TYPE } from 'src/components/KeyResult/constants'

import CommentFeedbackTag, {
  backgroundColor,
  borderColor,
} from '../../../Sections/Timeline/Cards/Comment/Feedbacks/Tag'

const StyledCommentFeedbackTag = styled(CommentFeedbackTag)`
  border-radius: 10px;

  & > div {
    margin-bottom: 20px;
  }
`

const tags: COMMENT_TYPE[] = [
  COMMENT_TYPE.PRAISAL,
  COMMENT_TYPE.ISSUE,
  COMMENT_TYPE.QUESTION,
  COMMENT_TYPE.ALIGNMENT,
  COMMENT_TYPE.SUGGESTION,
  COMMENT_TYPE.IMPROVEMENT,
  COMMENT_TYPE.COMMENT,
]

interface FeedbackOptions {
  selectedValue: COMMENT_TYPE
  setFeedbackOption: (tag: COMMENT_TYPE) => void
}

const FeedbackOptions = ({ selectedValue, setFeedbackOption }: FeedbackOptions) => {
  const [borderColorToken] = useToken('colors', [borderColor.get(selectedValue) ?? ''])

  const handleChange = (newValue: string | string[]) => {
    if (Array.isArray(newValue)) throw new Error('Cannot parse string array')
    const selectedTag = tags.find((tag) => tag === newValue)
    if (selectedTag) setFeedbackOption(selectedTag)
  }

  return (
    <SelectMenu
      closeOnSelect
      value={selectedValue}
      borderWidth={1}
      borderColor={borderColorToken}
      placement="top-start"
      backgroundColor={backgroundColor.get(selectedValue)}
      valueLabel={<StyledCommentFeedbackTag type={selectedValue} />}
      p="5px 12px"
      borderRadius={22}
      scroolable={false}
      maxW="160px"
      onChange={handleChange}
    >
      {tags.map((tag) => (
        <MenuItemOption
          key={tag}
          value={tag}
          borderColor={borderColor.get(tag)}
          borderWidth={1}
          marginTop={2}
          backgroundColor={backgroundColor.get(tag)}
          borderRadius={22}
          minW="160px"
          maxW="100%"
          py={2}
          px={1}
        >
          <StyledCommentFeedbackTag type={tag} />
        </MenuItemOption>
      ))}
    </SelectMenu>
  )
}

export default FeedbackOptions
