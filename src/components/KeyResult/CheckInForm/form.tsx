import { useMutation } from '@apollo/client'
import { Flex, FormControl, SpaceProps } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import activeAndOwnedByUserQuery from 'src/components/KeyResult/ActiveAndOwnedByUser/queries.gql'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import notificationsQuery from 'src/components/Notifications/Modal/queries.gql'
import accordionItemPanelQuery from 'src/components/Objective/Accordion/Item/Panel/queries.gql'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { keyResultCheckInCommentEnabled } from 'src/state/recoil/key-result/check-in'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'
import { createdByCheckInNotificationAtom } from 'src/state/recoil/notifications'
import meAtom from 'src/state/recoil/user/me'

import {
  CheckInFormFieldConfidence,
  CheckInFormFieldValueNew,
  CheckInFormFieldValuePrevious,
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
  onCompleted?: (data: KeyResultCheckIn) => void
  valueNew?: KeyResultCheckIn['value']
}

export interface CheckInFormValues {
  valueNew?: KeyResultCheckIn['value']
  valuePrevious?: KeyResultCheckIn['value']
  confidence?: KeyResultCheckIn['confidence']
  comment?: KeyResultCheckIn['comment']
}

export interface CreateKeyResultCheckInMutation {
  createKeyResultCheckIn: KeyResultCheckIn
}

const CheckInForm = ({
  keyResultID,
  afterSubmit,
  gutter,
  isCommentAlwaysEnabled,
  showGoal,
  onCancel,
  onCompleted,
  valueNew,
}: CheckInFormProperties) => {
  const { dispatch: dispatchEvent } = useEvent(EventType.CREATED_KEY_RESULT_CHECK_IN)
  const isCreated = useRecoilValue(createdByCheckInNotificationAtom)
  const userId = useRecoilValue(meAtom)

  const [latestKeyResultCheckIn, setLatestKeyResultCheckIn] = useRecoilState(
    selectLatestCheckIn(keyResultID),
  )
  const setCommentEnabled = useSetRecoilState(keyResultCheckInCommentEnabled(keyResultID))
  const [createCheckIn, { loading }] = useMutation<CreateKeyResultCheckInMutation>(
    queries.CREATE_KEY_RESULT_CHECK_IN,
    {
      ignoreResults: false,
      onCompleted: (data) => {
        setLatestKeyResultCheckIn(data.createKeyResultCheckIn)
        if (onCompleted) onCompleted(data.createKeyResultCheckIn)
        dispatchEvent({ createdByNotification: Boolean(isCreated), userId })
      },
      refetchQueries: [
        activeAndOwnedByUserQuery.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
        accordionItemPanelQuery.GET_OBJECTIVE_KEY_RESULTS,
        notificationsQuery.GET_KEYRESULTS_FOR_NOTIFICATIONS,
      ],
    },
  )

  const initialValues: CheckInFormValues = {
    valueNew: valueNew ?? latestKeyResultCheckIn?.value,
    valuePrevious: latestKeyResultCheckIn?.value,
    confidence: latestKeyResultCheckIn?.confidence,
    comment: '',
  }

  const refreshFields = (values: CheckInFormValues, actions: FormikHelpers<CheckInFormValues>) => {
    actions?.setFieldValue('valuePrevious', values.valueNew)
    actions?.setFieldValue('valueNew', values.valueNew)
    actions?.setFieldValue('comment', initialValues.comment)
  }

  const syncRecoilState = () => {
    setCommentEnabled(isCommentAlwaysEnabled)
  }

  const dispatchRemoteUpdate = async (values: CheckInFormValues) => {
    const checkIn = {
      keyResultId: keyResultID,
      value: values.valueNew,
      confidence: values.confidence,
      comment: values.comment,
    }
    const clearedCheckIn = omitBy(checkIn, isUndefined)

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
    const wasProgressUpdated = values.valuePrevious !== values.valueNew
    const wasConfidenceUpdated = values.confidence !== latestKeyResultCheckIn?.confidence
    const wasCommentCreated = values.comment && values.comment !== ''

    if (wasProgressUpdated || wasConfidenceUpdated || wasCommentCreated) {
      await dispatchRemoteUpdate(values)

      if (afterSubmit) afterSubmit(values)

      syncRecoilState()
      refreshFields(values, actions)
    }
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
  }

  useEffect(() => {
    if (isCommentAlwaysEnabled) setCommentEnabled(true)
  }, [isCommentAlwaysEnabled, setCommentEnabled])

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FormControl id={`key-result-checkin-${keyResultID?.toString() ?? ''}`}>
            <Flex direction="column" gridGap={4} p={gutter}>
              <Flex gridGap={5}>
                <CheckInFormFieldValuePrevious keyResultID={keyResultID} />
                <CheckInFormFieldValueNew keyResultID={keyResultID} isLoading={loading} />
                {showGoal && <CheckInFormFieldGoal keyResultID={keyResultID} />}
              </Flex>
              <CheckInFormFieldConfidence />

              <CheckInFormFieldComment keyResultID={keyResultID} />

              <Actions
                isLoading={loading}
                showCancelButton={Boolean(onCancel)}
                onCancel={handleCancel}
              />
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
