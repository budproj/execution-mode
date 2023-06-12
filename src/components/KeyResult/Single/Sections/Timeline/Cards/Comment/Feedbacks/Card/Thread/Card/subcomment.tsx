import React from 'react'

import { KeyResultComment } from 'src/components/KeyResult/types'

import KeyResultSectionTimelineCardComment from '../../../../Default'

interface SubCommentProperties {
  data: Partial<KeyResultComment>
}

const SubComment = ({ data }: SubCommentProperties) => {
  return <KeyResultSectionTimelineCardComment data={data} />
}

export default SubComment
