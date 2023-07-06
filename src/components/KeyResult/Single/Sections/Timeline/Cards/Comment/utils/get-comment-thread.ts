import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult, KeyResultComment, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import keyResultTimeline from 'src/state/recoil/key-result/timeline/selector'

type commentThread = Partial<KeyResultComment> & {
  thread?: Array<Partial<KeyResultComment>>
}

interface useGetKeyResultCommentThreadReturn {
  data: commentThread
}

export const useGetKeyResultCommentThread = (
  commentId?: KeyResultComment['id'],
  keyResultID?: KeyResult['id'],
): useGetKeyResultCommentThreadReturn => {
  const timelineConnection = useRecoilValue(keyResultTimeline(keyResultID))
  const [timeline, setTimelineEdges] = useConnectionEdges<KeyResultTimelineEntry>()

  useEffect(() => {
    if (timelineConnection) setTimelineEdges(timelineConnection.edges)
  }, [timelineConnection, setTimelineEdges])

  const comments = timeline.filter((entry) => entry.__typename === 'KeyResultComment') as Array<
    Partial<KeyResultComment>
  >

  const comment = comments?.find((comment) => comment.id === commentId) as Partial<KeyResultComment>

  const commentThread = comments.filter((edge) => edge.parentId === comment.id)

  const commentThreadInOrder = commentThread.sort(
    (a, b) => new Date(a.createdAt as string).getTime() - new Date(b.createdAt as string).getTime(),
  )

  const marshallComment = { ...comment, thread: commentThreadInOrder }

  return { data: marshallComment }
}
