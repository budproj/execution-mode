import { useMutation } from '@apollo/client'
import { Flex, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import ExpandableText from 'src/components/Base/ExpandableText'
import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultComment } from 'src/components/KeyResult/types'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

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
  const isLoaded = Boolean(data)

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
      user={data?.user}
      date={data?.createdAt}
      isLoaded={isLoaded}
      policy={data?.policy}
      intlCardType={intlCardType}
      onDelete={handleDelete}
    >
      <Flex gridGap={4} direction="column">
        <SkeletonText noOfLines={4} isLoaded={isLoaded}>
          <ExpandableText text={data?.text ?? ''} fontSize="md" color="gray.500" />
        </SkeletonText>
      </Flex>
    </KeyResultSectionTimelineCardBase>
  )
}

export default KeyResultSectionTimelineCardComment
