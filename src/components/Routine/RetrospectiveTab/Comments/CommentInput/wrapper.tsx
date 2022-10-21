import { useToast } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useSetRecoilState } from 'recoil'

import { useCreateComment } from 'src/components/Routine/hooks/setComment'
import { User } from 'src/components/User/types'
import { commentsAtom } from 'src/state/recoil/comments/comments'

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
  const toast = useToast()

  const entity = `${COMMENT_DOMAIN.routine}:${domainEntityId}`

  const setRoutineComment = useSetRecoilState(commentsAtom)

  const initialValues: RoutineCommentsInputInitialValues = {
    text: '',
  }

  const handleSubmit = async (
    values: RoutineCommentsInputInitialValues,
    actions: FormikHelpers<RoutineCommentsInputInitialValues>,
  ) => {
    if (values.text) {
      handleCreateComment({ content: values.text, entity })
      console.log({ comment })
      setRoutineComment((previousComments) => [...previousComments, comment])
      actions.resetForm()
    } else {
      toast({
        title: 'Escreva algo para comentar!',
        status: 'error',
      })
    }
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <CustomMentionsInput userThatWillBeAnswered={routineUser} isLoading={Boolean(comment)} />
      </Form>
    </Formik>
  )
}

export default RoutineCommentsInput
