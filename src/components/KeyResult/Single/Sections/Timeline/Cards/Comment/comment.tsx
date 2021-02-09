import { useMutation } from '@apollo/client'
import { Flex, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'

import ExpandableText from 'src/components/Base/ExpandableText'
import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultComment } from 'src/components/KeyResult/types'
import { removeTimelineEntry } from 'src/state/recoil/key-result/selectors'

import KeyResultSectionTimelineCardCommentHeader from './header'
import queries from './queries.gql'

export interface KeyResultSectionTimelineCardCommentProperties {
  data?: Partial<KeyResultComment>
}

const KeyResultSectionTimelineCardComment = ({
  data,
}: KeyResultSectionTimelineCardCommentProperties) => {
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(data?.keyResultId))
  const [deleteKeyResultComment] = useMutation(queries.DELETE_KEY_RESULT_COMMENT, {
    onCompleted: () => removeEntryFromTimeline(data),
  })

  const handleDelete = async () => {
    await deleteKeyResultComment({
      variables: {
        keyResultCommentID: data?.id,
      },
    })
  }

  return (
    <KeyResultSectionTimelineCardBase policies={data?.policies} onDelete={handleDelete}>
      <Flex gridGap={4} direction="column">
        <KeyResultSectionTimelineCardCommentHeader
          fullName={data?.user?.fullName}
          picture={data?.user?.picture}
          date={new Date(data?.createdAt ?? 0)}
        />
        <SkeletonText noOfLines={4} isLoaded={Boolean(data)}>
          <ExpandableText text={data?.text ?? ''} fontSize="sm" />
        </SkeletonText>
      </Flex>
    </KeyResultSectionTimelineCardBase>
  )
}

export default KeyResultSectionTimelineCardComment
