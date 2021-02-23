import { useMutation } from '@apollo/client'
import { Flex, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import ExpandableText from 'src/components/Base/ExpandableText'
import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultComment } from 'src/components/KeyResult/types'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

import KeyResultSectionTimelineCardCommentHeader from './header'
import messages from './messages'
import queries from './queries.gql'

export interface KeyResultSectionTimelineCardCommentProperties {
  data?: Partial<KeyResultComment>
  onEntryDelete?: (entryType: string) => void
}

const KeyResultSectionTimelineCardComment = ({
  data,
  onEntryDelete,
}: KeyResultSectionTimelineCardCommentProperties) => {
  const intl = useIntl()
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(data?.keyResultId))
  const [deleteKeyResultComment] = useMutation(queries.DELETE_KEY_RESULT_COMMENT, {
    onCompleted: () => removeEntryFromTimeline(data),
  })

  const intlCardType = intl.formatMessage(messages.cardType)

  const handleDelete = async () => {
    await deleteKeyResultComment({
      variables: {
        keyResultCommentID: data?.id,
      },
    })

    if (onEntryDelete) onEntryDelete(intlCardType)
  }

  return (
    <KeyResultSectionTimelineCardBase
      policies={data?.policies}
      intlCardType={intlCardType}
      onDelete={handleDelete}
    >
      <Flex gridGap={4} direction="column">
        <KeyResultSectionTimelineCardCommentHeader
          fullName={data?.user?.fullName}
          picture={data?.user?.picture}
          date={new Date(data?.createdAt ?? 0)}
        />
        <SkeletonText noOfLines={4} isLoaded={Boolean(data)}>
          <ExpandableText text={data?.text ?? ''} fontSize="sm" color="uniqueGray.400" />
        </SkeletonText>
      </Flex>
    </KeyResultSectionTimelineCardBase>
  )
}

export default KeyResultSectionTimelineCardComment
