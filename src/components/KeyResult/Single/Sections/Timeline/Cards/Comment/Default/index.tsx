import { useMutation } from '@apollo/client'
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultComment } from 'src/components/KeyResult/types'
import { insertMentionInString } from 'src/components/Routine/RetrospectiveTab/Comments/CommentCard'
import { useDeleteComment } from 'src/components/Routine/hooks/deleteComment'
import UserProfileCard from 'src/components/User/ProfileCard'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

import messages from '../messages'
import queries from '../queries.gql'

export interface KeyResultSectionTimelineCardCommentProperties {
  data?: Partial<KeyResultComment>
  isSubcomment?: boolean
  onEntryDelete?: (entryType: string) => void
  isFromTask?: boolean
}

export const MarkedUser = ({ id, name }: { id?: string; name?: string }) => (
  <Popover placement="top-end" size="sm">
    <PopoverTrigger>
      <Text as="span" color="brand.500" cursor="pointer">
        {name}
      </Text>
    </PopoverTrigger>
    <PopoverContent p={0}>
      <PopoverBody p={0}>
        <UserProfileCard userID={id} />
      </PopoverBody>
    </PopoverContent>
  </Popover>
)

const KeyResultSectionTimelineCardComment = ({
  data,
  isSubcomment = false,
  onEntryDelete,
  isFromTask = false,
}: KeyResultSectionTimelineCardCommentProperties) => {
  const intl = useIntl()
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(data?.keyResultId))
  const [deleteKeyResultComment] = useMutation(queries.DELETE_KEY_RESULT_COMMENT, {
    onCompleted: () => removeEntryFromTimeline(data),
  })
  const keyResult = useRecoilValue(keyResultAtomFamily(data?.keyResultId))

  const intlCardType = intl.formatMessage(messages.cardType)
  const isLoaded = Boolean(data)
  const { deleteComment } = useDeleteComment()

  const handleDelete = async () => {
    if (isFromTask && data && data.id) {
      deleteComment({ id: data.id })
      return
    }

    await deleteKeyResultComment({
      variables: {
        keyResultCommentID: data?.id,
      },
    })

    if (onEntryDelete) onEntryDelete(intlCardType)
  }

  const formattedCommentText = useMemo(() => {
    return data?.text?.split('\n').map((line) => (
      <span key={line} style={{ display: 'block' }}>
        {insertMentionInString(line)}
      </span>
    ))
  }, [data?.text])

  return (
    <KeyResultSectionTimelineCardBase
      user={data?.user}
      date={data?.createdAt}
      isLoaded={isLoaded}
      keyResultMode={keyResult?.mode}
      isSubcomment={isSubcomment}
      policy={data?.policy}
      intlCardType={intlCardType}
      isFromTask={isFromTask}
      onDelete={handleDelete}
    >
      <Flex gridGap={4} direction="column">
        <SkeletonText noOfLines={4} isLoaded={isLoaded}>
          <Text fontSize="md" color="new-gray.900">
            {formattedCommentText}
          </Text>
        </SkeletonText>
      </Flex>
    </KeyResultSectionTimelineCardBase>
  )
}

export default KeyResultSectionTimelineCardComment
