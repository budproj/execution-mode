import { useContext, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

import { Comment } from '../../RetrospectiveTab/Comments/types'

type useCreateCommentProperties = {
  entity: Comment['entity']
  content: Comment['content']
}

export const useCreateComment = () => {
  const { servicesPromise } = useContext(ServicesContext)

  const [comment, setComment] = useState<Comment>({} as Comment)

  const handleCreateComment = async ({ entity, content }: useCreateCommentProperties) => {
    const { comments } = await servicesPromise
    const { data: createdComment } = await comments.post<Comment>(`/comments/${entity}`, {
      entity,
      content,
    })

    console.log({ createdComment })

    if (createdComment) {
      setComment(createdComment)
    }
  }

  return { handleCreateComment, comment }
}
