import { useContext } from 'react'
import { useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { User } from 'src/components/User/types'
import { commentsAtom } from 'src/state/recoil/comments/comments'

import { Comment } from '../../RetrospectiveTab/Comments/types'

type useCreateCommentProperties = {
  entity: Comment['entity']
  content: Comment['content']
  user?: Partial<User>
}

export const useCreateComment = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const setRoutineComment = useSetRecoilState(commentsAtom)

  const handleCreateComment = async ({ entity, content, user }: useCreateCommentProperties) => {
    const { comments } = await servicesPromise

    if (entity) {
      const { data: createdComment } = await comments.post<Comment>(`/comments/${entity}`, {
        content,
        user,
      })
      setRoutineComment((previousComments) => [...previousComments, createdComment])
    }
  }

  return { handleCreateComment }
}
