import { useMutation } from '@apollo/client'
import { Flex, FormControl, SpaceProps } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import React from 'react'
import { useRecoilState } from 'recoil'

import queries from 'src/components/KeyResult/queries.gql'
import { KeyResult, ProgressReport, ConfidenceReport } from 'src/components/KeyResult/types'
import {
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
  keyResultProgressUpdateCurrentConfidence as selectCurrentConfidence,
} from 'src/state/recoil/key-result/progress-update'

import { CurrentProgressField, NewProgressField, CurrentConfidenceField, GoalField } from './Fields'
import Actions from './actions'

export interface CheckInFormProperties {
  submitOnBlur: boolean
  showGoal: boolean
  gutter?: SpaceProps['p']
  keyResultID?: KeyResult['id']
  afterSubmit?: (
    newProgress?: ProgressReport['valueNew'],
    newConfidence?: ConfidenceReport['valueNew'],
  ) => void
}

export interface CheckInFormValues {
  currentProgress?: ProgressReport['valueNew']
  confidence?: ConfidenceReport['valueNew']
  newProgress?: ProgressReport['valueNew']
}

const CheckInForm = ({
  keyResultID,
  afterSubmit,
  gutter,
  submitOnBlur,
  showGoal,
}: CheckInFormProperties) => {
  const [currentProgress, setCurrentProgress] = useRecoilState(selectCurrentProgress(keyResultID))
  const [confidence, setConfidence] = useRecoilState(selectCurrentConfidence(keyResultID))
  const [createCheckIn, data] = useMutation(queries.CREATE_CHECK_IN)
  const initialValues: CheckInFormValues = {
    currentProgress,
    confidence,
    newProgress: 0,
  }

  const syncDisabledFields = (
    values: CheckInFormValues,
    actions: FormikHelpers<CheckInFormValues>,
  ) => {
    actions?.setFieldValue('currentProgress', values.newProgress)
  }

  const syncRecoilState = (values: CheckInFormValues) => {
    if (values.newProgress !== currentProgress) setCurrentProgress(values.newProgress)
    if (values.confidence !== confidence) setConfidence(values.confidence)
  }

  const dispatchRemoteUpdate = async (values: CheckInFormValues) => {
    const checkIn = {
      keyResultId: keyResultID,
      progress: values.newProgress,
      confidence: values.confidence,
    }

    await createCheckIn({
      variables: {
        checkInInput: checkIn,
      },
    })
  }

  const handleSubmit = async (
    values: CheckInFormValues,
    actions: FormikHelpers<CheckInFormValues>,
  ) => {
    if (values.newProgress !== currentProgress || values.confidence !== confidence) {
      syncDisabledFields(values, actions)
      syncRecoilState(values)
      await dispatchRemoteUpdate(values)
    }

    if (afterSubmit) afterSubmit(values.newProgress, values.confidence)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FormControl id={`key-result-checkin-${keyResultID?.toString() ?? ''}`}>
            <Flex direction="column" gridGap={5} p={gutter} pb={submitOnBlur ? 0 : 8}>
              <CurrentConfidenceField submitOnBlur={submitOnBlur} isLoading={data.loading} />
              <Flex gridGap={5}>
                <CurrentProgressField keyResultID={keyResultID} />
                <NewProgressField
                  keyResultID={keyResultID}
                  submitOnBlur={submitOnBlur}
                  isLoading={data.loading}
                />
                {showGoal && <GoalField keyResultID={keyResultID} />}
              </Flex>
            </Flex>

            {!submitOnBlur && <Actions isLoading={data.loading} gutter={gutter} />}
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

CheckInForm.defaultProps = {
  submitOnBlur: false,
  showGoal: false,
}

export default CheckInForm
