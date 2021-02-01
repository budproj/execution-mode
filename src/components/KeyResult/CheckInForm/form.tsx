import { useMutation } from '@apollo/client'
import { Flex, FormControl, SpaceProps } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import pickBy from 'lodash/pickBy'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import {
  keyResultCheckInCommentEnabled,
  keyResultCheckInProgressDraft,
} from 'src/state/recoil/key-result/check-in'
import {
  selectCurrentProgress,
  selectCurrentConfidence,
  selectLatestCheckIn,
} from 'src/state/recoil/key-result/selectors'

import {
  CheckInFormFieldCurrentProgress,
  CheckInFormFieldNewProgress,
  CheckInFormFieldCurrentConfidence,
  CheckInFormFieldGoal,
} from './Fields'
import CheckInFormFieldComment from './Fields/Comment'
import Actions from './actions'
import queries from './queries.gql'

export interface CheckInFormProperties {
  showGoal: boolean
  isCommentAlwaysEnabled: boolean
  gutter?: SpaceProps['p']
  keyResultID?: KeyResult['id']
  afterSubmit?: (values: CheckInFormValues) => void
  onCancel?: () => void
}

export interface CheckInFormValues {
  comment: KeyResultCheckIn['comment']
  newProgress?: KeyResultCheckIn['progress']
  currentProgress?: KeyResultCheckIn['progress']
  confidence?: KeyResultCheckIn['confidence']
}

const CheckInForm = ({
  keyResultID,
  afterSubmit,
  gutter,
  isCommentAlwaysEnabled,
  showGoal,
  onCancel,
}: CheckInFormProperties) => {
  const [currentProgress, setCurrentProgress] = useRecoilState(selectCurrentProgress(keyResultID))
  const [currentConfidence, setCurrentConfidence] = useRecoilState(
    selectCurrentConfidence(keyResultID),
  )
  const [draftValue, setDraftValue] = useRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const setLatestCheckIn = useSetRecoilState(selectLatestCheckIn(keyResultID))
  const setCommentEnabled = useSetRecoilState(keyResultCheckInCommentEnabled(keyResultID))
  const [createCheckIn, data] = useMutation(queries.CREATE_KEY_RESULT_CHECK_IN)

  const initialValues: CheckInFormValues = {
    currentProgress,
    newProgress: draftValue,
    confidence: currentConfidence,
    comment: '',
  }

  const refreshFields = (values: CheckInFormValues, actions: FormikHelpers<CheckInFormValues>) => {
    actions?.setFieldValue('currentProgress', values.newProgress)
    actions?.setFieldValue('comment', initialValues.comment)
  }

  const syncRecoilState = (values: CheckInFormValues) => {
    if (values.newProgress !== currentProgress) setCurrentProgress(values.newProgress)
    if (values.confidence !== currentConfidence) setCurrentConfidence(values.confidence)

    setLatestCheckIn({
      progress: values.newProgress,
      confidence: values.confidence,
      comment: values.comment,
    })
    setCommentEnabled(isCommentAlwaysEnabled)
  }

  const dispatchRemoteUpdate = async (values: CheckInFormValues) => {
    const checkIn = {
      keyResultId: keyResultID,
      progress: values.newProgress,
      confidence: values.confidence,
      comment: values.comment,
    }
    const clearedCheckIn = pickBy(checkIn)

    await createCheckIn({
      variables: {
        keyResultCheckInInput: clearedCheckIn,
      },
    })
  }

  const handleSubmit = async (
    values: CheckInFormValues,
    actions: FormikHelpers<CheckInFormValues>,
  ) => {
    const wasProgressUpdated = values.newProgress !== currentProgress
    const wasConfidenceUpdated = values.confidence !== currentConfidence
    const wasCommentCreated = values.comment && values.comment !== ''

    if (wasProgressUpdated || wasConfidenceUpdated || wasCommentCreated) {
      await dispatchRemoteUpdate(values)

      if (afterSubmit) afterSubmit(values)

      syncRecoilState(values)
      refreshFields(values, actions)
    }
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    setDraftValue(currentProgress)
  }

  useEffect(() => {
    if (isCommentAlwaysEnabled) setCommentEnabled(true)
  }, [isCommentAlwaysEnabled, setCommentEnabled])

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FormControl id={`key-result-checkin-${keyResultID?.toString() ?? ''}`}>
            <Flex direction="column" gridGap={8} p={gutter}>
              <Flex gridGap={5}>
                <CheckInFormFieldCurrentProgress keyResultID={keyResultID} />
                <CheckInFormFieldNewProgress keyResultID={keyResultID} isLoading={data.loading} />
                {showGoal && <CheckInFormFieldGoal keyResultID={keyResultID} />}
              </Flex>
              <CheckInFormFieldCurrentConfidence />

              <CheckInFormFieldComment keyResultID={keyResultID} />

              <Actions isLoading={data.loading} onCancel={handleCancel} />
            </Flex>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

CheckInForm.defaultProps = {
  submitOnBlur: false,
  showGoal: false,
  isCommentAlwaysEnabled: false,
}

export default CheckInForm
