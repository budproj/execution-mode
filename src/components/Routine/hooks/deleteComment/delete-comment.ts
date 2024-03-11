import { useContext } from 'react'
import { useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { commentsAtom } from 'src/state/recoil/comments/comments'

import { Comment } from '../../RetrospectiveTab/Comments/types'

type useGetCommentsByEntityProperties = {
  id: Comment['id']
}

export const useDeleteComment = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const setComments = useSetRecoilState(commentsAtom)

  const deleteComment = async ({ id }: useGetCommentsByEntityProperties) => {
    const { comments: commentsService } = await servicesPromise
    await commentsService.delete<Comment[]>(`/comments/${id}`)
    setComments((previousComments) => [...previousComments].filter((comment) => comment.id !== id))
  }

  return { deleteComment }
}
