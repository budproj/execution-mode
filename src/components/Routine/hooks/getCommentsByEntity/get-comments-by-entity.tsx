import { useContext } from 'react'
import { useRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { commentsAtom } from 'src/state/recoil/comments/comments'

import { Comment } from '../../RetrospectiveTab/Comments/types'

type useGetCommentsByEntityProperties = {
  entity: Comment['entity']
}

export const useGetCommentsByEntity = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const [comments, setComments] = useRecoilState(commentsAtom)

  const getCommentsByEntity = async ({ entity }: useGetCommentsByEntityProperties) => {
    const { comments: commentsService } = await servicesPromise
    const { data: findedComments } = await commentsService.get<Comment[]>(`/comments/${entity}`)
    setComments(findedComments)
  }

  const refatch = ({ entity }: { entity: Comment['entity'] }) => {
    getCommentsByEntity({ entity })
  }

  return { getCommentsByEntity, comments, refatch }
}
