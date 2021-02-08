import { Flex, SkeletonText } from '@chakra-ui/react'
import React from 'react'

import ExpandableText from 'src/components/Base/ExpandableText'
import { KeyResultComment } from 'src/components/KeyResult/types'

import KeyResultSectionTimelineCardBase from '../Base'

import KeyResultSectionTimelineCardCommentHeader from './header'

export interface KeyResultSectionTimelineCardCommentProperties {
  data?: Partial<KeyResultComment>
}

const KeyResultSectionTimelineCardComment = ({
  data,
}: KeyResultSectionTimelineCardCommentProperties) => (
  <KeyResultSectionTimelineCardBase>
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

export default KeyResultSectionTimelineCardComment
