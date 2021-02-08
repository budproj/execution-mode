import React from 'react'

import { KeyResultComment } from 'src/components/KeyResult/types'

import KeyResultSectionTimelineCardBase from '../Base'

export interface KeyResultSectionTimelineCardCommentProperties {
  data?: Partial<KeyResultComment>
}

const KeyResultSectionTimelineCardComment = ({
  data,
}: KeyResultSectionTimelineCardCommentProperties) => (
  <KeyResultSectionTimelineCardBase>
    <p>Ok</p>
  </KeyResultSectionTimelineCardBase>
)

export default KeyResultSectionTimelineCardComment
