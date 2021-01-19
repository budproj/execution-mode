import React from 'react'

import KeyResultSectionCommentsComment from './Comment'

export interface KeyResultSectionsCommentsSkeletonProperties {
  noOfLines: number
}

const KeyResultSectionsCommentsSkeleton = ({
  noOfLines,
}: KeyResultSectionsCommentsSkeletonProperties) => (
  <>
    {[...new Array(noOfLines)].map(() => (
      <KeyResultSectionCommentsComment key={Math.random()} />
    ))}
  </>
)

export default KeyResultSectionsCommentsSkeleton
