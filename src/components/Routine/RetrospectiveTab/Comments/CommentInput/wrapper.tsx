import { useToast } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { useCreateComment } from 'src/components/Routine/hooks/setComment'
import { User } from 'src/components/User/types'
import { commentsAtom } from 'src/state/recoil/comments/comments'
import { commentInputInitialValue } from 'src/state/recoil/comments/input'
import { commentEntityToReply } from 'src/state/recoil/comments/reply-comment'

import { COMMENT_DOMAIN } from '../../Answers/utils/constants'
import { Comment } from '../types'

import CustomMentionsInput from './custom-mentions-input'

type RoutineCommentInputProperties = {
  domainEntityId: Comment['entity']
  routineUser?: User['firstName']
}

export interface RoutineCommentsInputInitialValues {
  text: string
}

const RoutineCommentsInput = ({ domainEntityId, routineUser }: RoutineCommentInputProperties) => {
  const { comment, handleCreateComment } = useCreateComment()
  const [inputInitialValues, setInputInitialValues] = useRecoilState(commentInputInitialValue)
  const [commentEntity, setCommentEntity] = useRecoilState(commentEntityToReply)

  const toast = useToast()

  const entity = commentEntity ?? `${COMMENT_DOMAIN.routine}:${domainEntityId}`

  const setRoutineComment = useSetRecoilState(commentsAtom)

  const handleSubmit = async (
    values: RoutineCommentsInputInitialValues,
    actions: FormikHelpers<RoutineCommentsInputInitialValues>,
  ) => {
    if (values.text) {
      handleCreateComment({ content: values.text, entity })
      setRoutineComment((previousComments) => [...previousComments, comment])
      setInputInitialValues({ text: '' })
      setCommentEntity('')
      actions.resetForm()
    } else {
      toast({
        title: 'Escreva algo para comentar!',
        status: 'error',
      })
    }
  }

  return (
    <Formik enableReinitialize initialValues={inputInitialValues} onSubmit={handleSubmit}>
      <Form>
        <CustomMentionsInput userThatWillBeAnswered={routineUser} isLoading={Boolean(comment)} />
      </Form>
    </Formik>
  )
}

export default RoutineCommentsInput
