import React from 'react'

import { EmptyState } from 'src/components/Base'
import { ProgressReport } from 'src/components/KeyResult/types'

import KeyResultSectionCommentsComment from './Comment'
import messages from './messages'

export interface KeyResultSectionsCommentsListProperties {
  comments?: ProgressReport[]
}

const KeyResultSectionsCommentsList = ({ comments }: KeyResultSectionsCommentsListProperties) =>
  typeof comments !== 'undefined' && comments.length > 0 ? (
    <>
      {comments.map(({ id, user, createdAt, comment }) => (
        <KeyResultSectionCommentsComment
          key={id}
          user={user}
          createdAt={createdAt}
          comment={comment}
        />
      ))}
    </>
  ) : (
    <EmptyState labelMessage={messages.emptyStateLabel} />
  )

export default KeyResultSectionsCommentsList
