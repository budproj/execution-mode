import { useMutation } from '@apollo/client'
import { Text, useToken, VStack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { COMMENT_TYPE, KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { KeyResultComment } from 'src/components/KeyResult/types'
import { insertMentionInString } from 'src/components/Routine/RetrospectiveTab/Comments/CommentCard'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

import KeyResultSectionTimelineCardBase from '../../../Base'
import messages from '../../messages'
import queries from '../../queries.gql'
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
  onEntryDelete?: (entryType: string) => void
}

const CommentFeedbacksCards = ({
  data: timelineData,
  onEntryDelete,
}: CommentFeedbacksCardsProperties) => {
  const type = timelineData?.type
  const keyResultID = timelineData?.keyResultId
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(keyResultID))
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))

  const { data } = useGetKeyResultCommentThread(timelineData?.id, keyResultID)
  const [deleteKeyResultComment] = useMutation(queries.DELETE_KEY_RESULT_COMMENT, {
    onCompleted: () => removeEntryFromTimeline(data),
  })
  const intl = useIntl()
  const [borderColorToken] = useToken('colors', [
    borderColor.get(type ?? COMMENT_TYPE.COMMENT) ?? '',
  ])

  const intlCardType = intl.formatMessage(messages.cardType)

  const handleDelete = async () => {
    await deleteKeyResultComment({
      variables: {
        keyResultCommentID: data?.id,
      },
    })

    if (onEntryDelete) onEntryDelete(intlCardType)
  }

  const formattedCommentText = useMemo(() => {
    return data.text?.split('\n').map((line) => (
      <span key={line} style={{ display: 'block' }}>
        {insertMentionInString(line)}
      </span>
    ))
  }, [data?.text])

  return (
    <KeyResultSectionTimelineCardBase
      user={data?.user}
      date={data?.createdAt}
      policy={data?.policy}
      backgroundColor={type ? backgroundColor.get(type) : ''}
      keyResultMode={keyResult?.mode}
      intlCardType={intlCardType}
      commentType={type}
      position="relative"
      border={`1px solid ${borderColorToken}`}
      onDelete={handleDelete}
    >
      {type === COMMENT_TYPE.COMMENT ? <div /> : <CommentFeedbackTag type={type} />}
      <Text color="new-gray.900" fontSize={14}>
        {formattedCommentText}
      </Text>
      <VStack gap="10px">
        {data.thread ? (
          data.thread.map((subComment) => <SubComment key={subComment.id} data={subComment} />)
        ) : (
          <div />
        )}
      </VStack>
      {type === COMMENT_TYPE.PRAISAL ? (
        <div />
      ) : keyResultID && timelineData.id && keyResult?.mode === KEY_RESULT_MODE.DRAFT ? (
        <CommentThreadInput keyResultID={keyResultID} parentId={timelineData.id} />
      ) : (
        <div />
      )}
    </KeyResultSectionTimelineCardBase>
  )
}

export default CommentFeedbacksCards
