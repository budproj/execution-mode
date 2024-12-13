/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/dot-notation */
import { useMutation } from '@apollo/client'
import { Flex, FormControl, SpaceProps } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import activeAndOwnedByUserQuery from 'src/components/KeyResult/ActiveAndOwnedByUser/queries.gql'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import notificationsQuery from 'src/components/Notifications/Modal/queries.gql'
import accordionItemPanelQuery from 'src/components/Objective/Accordion/Item/Panel/queries.gql'
import GET_KEY_RESULTS_HIGHLIGHTS from 'src/components/Page/Team/Highlights/get-key-results-highlights.gql'
import { CONFIDENCE_ACHIEVED, getConfidenceName } from 'src/state/hooks/useConfidenceTag/hook'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { keyResultCheckInCommentEnabled } from 'src/state/recoil/key-result/check-in'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { createdByCheckInNotificationAtom } from 'src/state/recoil/notifications'
import { isAchievedKeyResultModalOpenAtom } from 'src/state/recoil/team/is-achieved-key-result-modal-open.ts'
import meAtom from 'src/state/recoil/user/me'

import { AchivedKeyResultModal } from './AchievedKeyResultModal'
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
  const intl = useIntl()
  const { dispatch: dispatchEvent } = useEvent(EventType.CREATED_KEY_RESULT_CHECK_IN)
  const { dispatch: dispatchCreatedKeyResultCommentEvent } = useEvent(
    EventType.CREATED_KEY_RESULT_COMMENT,
  )
  const isCreated = useRecoilValue(createdByCheckInNotificationAtom)
  const userId = useRecoilValue(meAtom)

  const [latestKeyResultCheckIn, setLatestKeyResultCheckIn] = useRecoilState(
    selectLatestCheckIn(keyResultID),
  )
  const [isAchievedKeyResultModalOpen, setIsAchievedKeyResultModalOpen] = useRecoilState(
    isAchievedKeyResultModalOpenAtom,
  )
  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const setCommentEnabled = useSetRecoilState(keyResultCheckInCommentEnabled(keyResultID))
  const [createCheckIn, { loading }] = useMutation<CreateKeyResultCheckInMutation>(
    queries.CREATE_KEY_RESULT_CHECK_IN,
    {
      ignoreResults: false,
      onCompleted: (data) => {
        setLatestKeyResultCheckIn(data.createKeyResultCheckIn)
        if (onCompleted) onCompleted(data.createKeyResultCheckIn)
        dispatchEvent({
          createdByNotification: Boolean(isCreated),
          userId,
          confidence: getConfidenceName(data.createKeyResultCheckIn.confidence, intl),
        })
      },
      refetchQueries: [
        activeAndOwnedByUserQuery.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
        accordionItemPanelQuery.GET_OBJECTIVE_KEY_RESULTS,
        notificationsQuery.GET_KEYRESULTS_FOR_NOTIFICATIONS,
        GET_KEY_RESULTS_HIGHLIGHTS,
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
    await dispatchRemoteUpdate(values)

    if (values.confidence === CONFIDENCE_ACHIEVED.max) {
      resetOpenDrawer()
      setTimeout(() => setIsAchievedKeyResultModalOpen(true), 100)
    }

    if (afterSubmit) afterSubmit(values)

    syncRecoilState()
    refreshFields(values, actions)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
  }

  const handleAchievedModalClose = useCallback(() => {
    setIsAchievedKeyResultModalOpen(false)
  }, [setIsAchievedKeyResultModalOpen])

  return (
    <>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <FormControl id={`key-result-checkin-${keyResultID?.toString() ?? ''}`}>
              <Flex direction="column" gridGap={4} p={gutter}>
                <Flex gridGap={5}>
                  <CheckInFormFieldValuePrevious keyResultID={keyResultID} />
                  <CheckInFormFieldValueNew keyResultID={keyResultID} />
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
      <AchivedKeyResultModal
        isOpen={isAchievedKeyResultModalOpen}
        handleClose={handleAchievedModalClose}
      />
    </>
  )
}

CheckInForm.defaultProps = {
  submitOnBlur: false,
  showGoal: false,
  isCommentAlwaysEnabled: false,
}

export default CheckInForm
