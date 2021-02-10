import { useMutation } from '@apollo/client'
import { Avatar, Flex, SkeletonCircle } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResult, KeyResultComment } from 'src/components/KeyResult/types'
import selectLatestTimelineEntry from 'src/state/recoil/key-result/timeline/latest-entry'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import KeyResultSectionAddCommentInput from './input'
import queries from './queries.gql'

export interface KeyResultSectionAddCommentProperties {
  keyResultID?: KeyResult['id']
}

export interface CreateKeyResultCommentMutation {
  createKeyResultComment: KeyResultComment
}

export interface KeyResultSectionAddCommentInitialValues {
  text: KeyResultComment['text']
}

const KeyResultSectionAddComment = ({ keyResultID }: KeyResultSectionAddCommentProperties) => {
  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(userID))
  const setLatestTimelineEntry = useSetRecoilState(selectLatestTimelineEntry(keyResultID))
  const [createComment] = useMutation<CreateKeyResultCommentMutation>(
    queries.CREATE_KEY_RESULT_COMMENT,
    {
      ignoreResults: false,
      onCompleted: (data) => setLatestTimelineEntry(data.createKeyResultComment),
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
    }

    await createComment({
      variables: {
        keyResultCommentInput,
      },
    })

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
