import { Text, useToken } from '@chakra-ui/react'
import React from 'react'
import regexifyString from 'regexify-string'

import { getScrollableItem } from 'src/components/Base/ScrollableItem/scrollable-item'
import { COMMENT_TYPE } from 'src/components/KeyResult/constants'
import { KeyResultComment } from 'src/components/KeyResult/types'

import KeyResultSectionTimelineCardBase from '../../../Base'
import { MarkedUser } from '../../Default'
import { useGetKeyResultCommentThread } from '../../utils/get-comment-thread'
import CommentFeedbackTag from '../Tag'

import SubComment from './Thread/Card/subcomment'
import CommentThreadInput from './Thread/Input'

const backgroundColor = new Map([
  [COMMENT_TYPE.SUGGESTION, 'blue.50'],
  [COMMENT_TYPE.ALIGNMENT, 'gray.50'],
  [COMMENT_TYPE.IMPROVEMENT, 'brand.50'],
  [COMMENT_TYPE.PRAISAL, 'green.50'],
  [COMMENT_TYPE.QUESTION, 'yellow.50'],
  [COMMENT_TYPE.ISSUE, 'red.50'],
])

const borderColor = new Map([
  [COMMENT_TYPE.SUGGESTION, 'blue.300'],
  [COMMENT_TYPE.ALIGNMENT, 'gray.300'],
  [COMMENT_TYPE.IMPROVEMENT, 'brand.300'],
  [COMMENT_TYPE.PRAISAL, 'green.300'],
  [COMMENT_TYPE.QUESTION, 'yellow.300'],
  [COMMENT_TYPE.ISSUE, 'red.500'],
])

interface CommentFeedbacksCardsProperties {
  data?: Partial<KeyResultComment>
}

const ScrollableItem = getScrollableItem()

const CommentFeedbacksCards = ({ data: timelineData }: CommentFeedbacksCardsProperties) => {
  const type = timelineData?.type
  const keyResultID = timelineData?.keyResultId
  const { data } = useGetKeyResultCommentThread(timelineData?.id, keyResultID)
  const [borderColorToken] = useToken('colors', [
    borderColor.get(type ?? COMMENT_TYPE.COMMENT) ?? '',
  ])

  const commentText = regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, name, id] = regex.exec(match) ?? [undefined, '', '']

      return <MarkedUser id={id} name={name} />
    },
    input: data?.text ?? '',
  })

  return (
    <KeyResultSectionTimelineCardBase
      user={data?.user}
      date={data?.createdAt}
      policy={data?.policy}
      backgroundColor={type ? backgroundColor.get(type) : ''}
      position="relative"
      border={`1px solid ${borderColorToken}`}
    >
      {type === COMMENT_TYPE.COMMENT ? <div /> : <CommentFeedbackTag type={type} />}
      <Text color="new-gray.900" fontSize={14}>
        {commentText}
      </Text>
      <ScrollableItem maxH={142} display="flex" flexDir="column" gap="10px">
        {data.thread ? (
          data.thread.map((subComment) => <SubComment key={subComment.id} data={subComment} />)
        ) : (
          <div />
        )}
      </ScrollableItem>
      {type === COMMENT_TYPE.PRAISAL ? (
        <div />
      ) : keyResultID && timelineData.id ? (
        <CommentThreadInput keyResultID={keyResultID} parentId={timelineData.id} />
      ) : (
        <div />
      )}
    </KeyResultSectionTimelineCardBase>
  )
}

export default CommentFeedbacksCards
