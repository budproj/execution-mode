import { useMutation } from '@apollo/client'
import { Avatar, Flex, SkeletonCircle, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { COMMENT_TYPE } from 'src/components/KeyResult/constants'
import { KeyResult, KeyResultComment } from 'src/components/KeyResult/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import selectLatestTimelineEntry from 'src/state/recoil/key-result/timeline/latest-entry'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import KeyResultSectionAddCommentInput from './input'
import messages from './messages'
import queries from './queries.gql'

export interface KeyResultSectionAddCommentProperties {
  keyResultID?: KeyResult['id']
  parentCommentId?: KeyResultComment['id']
  type?: COMMENT_TYPE
}

export interface CreateKeyResultCommentMutation {
  createKeyResultComment: KeyResultComment
}

export interface KeyResultSectionAddCommentInitialValues {
  text: KeyResultComment['text']
}

const KeyResultSectionAddComment = ({
  keyResultID,
  parentCommentId,
  type = COMMENT_TYPE.COMMENT,
}: KeyResultSectionAddCommentProperties) => {
  const { dispatch: dispatchEvent } = useEvent(EventType.CREATED_KEY_RESULT_COMMENT)
  const userID = useRecoilValue(meAtom)
  const [user, updateUser] = useRecoilState(selectUser(userID))
  const setLatestTimelineEntry = useSetRecoilState(selectLatestTimelineEntry(keyResultID))
  const toast = useToast()
  const intl = useIntl()
  const [createComment] = useMutation<CreateKeyResultCommentMutation>(
    queries.CREATE_KEY_RESULT_COMMENT,
    {
      ignoreResults: false,
      onCompleted: (data) => {
        setLatestTimelineEntry(data.createKeyResultComment)
        updateUser(data.createKeyResultComment.user)
        dispatchEvent({})
      },
    },
  )

  const initialValues: KeyResultSectionAddCommentInitialValues = {
    text: '',
  }

  const handleSubmit = async (
    values: KeyResultSectionAddCommentInitialValues,
    actions: FormikHelpers<KeyResultSectionAddCommentInitialValues>,
  ) => {
    const keyResultCommentInput = {
      keyResultId: keyResultID,
      text: values.text,
      parentId: parentCommentId,
      type,
    }

    if (values.text.length > 0) {
      await createComment({
        variables: {
          keyResultCommentInput,
        },
      })
    } else {
      toast({
        status: 'warning',
        title: intl.formatMessage(messages.emptyCommentWarningMessage),
      })
    }

    actions.resetForm()
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Flex gridGap={3} alignItems="flex-start">
          <SkeletonCircle isLoaded={Boolean(user)} w={10} h={10}>
            <Avatar name={user?.fullName} src={user?.picture} w={10} h={10} />
          </SkeletonCircle>
          <KeyResultSectionAddCommentInput isLoading={!keyResultID} />
        </Flex>
      </Form>
    </Formik>
  )
}

export default KeyResultSectionAddComment
