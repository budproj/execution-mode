import { useToast } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useRecoilState } from 'recoil'

import { useCreateComment } from 'src/components/Routine/hooks/setComment'
import { User } from 'src/components/User/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { commentInputInitialValue } from 'src/state/recoil/comments/input'
import { commentEntityToReply } from 'src/state/recoil/comments/reply-comment'

import { COMMENT_DOMAIN } from '../../Answers/utils/constants'
import { Comment } from '../types'

import CustomMentionsInput from './custom-mentions-input'

type RoutineCommentInputProperties = {
  domainEntityId: Comment['entity']
  routineUser?: Partial<User>
  showLastComment: () => void
}

export interface RoutineCommentsInputInitialValues {
  text: string
}

const RoutineCommentsInput = ({
  domainEntityId,
  routineUser,
  showLastComment,
}: RoutineCommentInputProperties) => {
  const { handleCreateComment } = useCreateComment()
  const [inputInitialValues, setInputInitialValues] = useRecoilState(commentInputInitialValue)
  const [commentEntity, setCommentEntity] = useRecoilState(commentEntityToReply)
  const { dispatch: dispatchCommentInRoutineClick } = useEvent(
    EventType.COMMENT_IN_ROUTINE_ANSWER_CLICK,
  )
  const { dispatch: dispatchMentionInRoutineClick } = useEvent(
    EventType.MENTION_IN_ROUTINE_ANSWER_CLICK,
  )
  const toast = useToast()

  const entity = commentEntity ? commentEntity : `${COMMENT_DOMAIN.routine}:${domainEntityId}`

  const submitForm = async (
    values: RoutineCommentsInputInitialValues,
    actions: FormikHelpers<RoutineCommentsInputInitialValues>,
  ) => {
    if (values.text) {
      await handleCreateComment({ content: values.text, entity, user: routineUser })
      dispatchCommentInRoutineClick({})
      const isTagged = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/.test(values.text)
      if (isTagged) {
        dispatchMentionInRoutineClick({})
      }

      setInputInitialValues({ text: '' })
      setCommentEntity('')
      showLastComment()
      actions.setSubmitting(false)
      actions.resetForm()
    } else {
      toast({
        title: 'Escreva algo para comentar!',
        status: 'error',
      })
    }
  }

  return (
    <Formik enableReinitialize initialValues={inputInitialValues} onSubmit={submitForm}>
      {({ handleSubmit }) => (
        <Form
          style={{
            position: 'sticky',
            bottom: '-1px',
            backgroundColor: 'white',
            width: '100%',
            zIndex: 3,
          }}
          onSubmit={handleSubmit}
        >
          <CustomMentionsInput userThatWillBeAnswered={routineUser?.firstName} />
        </Form>
      )}
    </Formik>
  )
}

export default RoutineCommentsInput
