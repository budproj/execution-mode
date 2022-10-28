import { useContext } from 'react'
import { useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { commentsAtom } from 'src/state/recoil/comments/comments'

import { Comment } from '../../RetrospectiveTab/Comments/types'

type useGetCommentsByEntityProperties = {
  entity: Comment['entity']
}

export const useGetCommentsByEntity = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const setComments = useSetRecoilState(commentsAtom)

  const getCommentsByEntity = async ({ entity }: useGetCommentsByEntityProperties) => {
    const { comments } = await servicesPromise
    const { data: findedComments } = await comments.get<Comment[]>(`/comments/${entity}`)
    if (findedComments) setComments(findedComments)
  }

  return { getCommentsByEntity }
}
