import { useMutation } from '@apollo/client'
import { Flex, FormControl, SpaceProps } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { KeyResult, ProgressReport, ConfidenceReport } from 'src/components/KeyResult/types'
import {
  selectCurrentProgress,
  selectCurrentConfidence,
  selectLatestConfidenceReport,
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
  submitOnBlur: boolean
  showGoal: boolean
  gutter?: SpaceProps['p']
  keyResultID?: KeyResult['id']
  afterSubmit?: (
    newProgress?: ProgressReport['valueNew'],
    newConfidence?: ConfidenceReport['valueNew'],
  ) => void
  onCancel?: () => void
}

export interface CheckInFormValues {
  currentProgress?: ProgressReport['valueNew']
  confidence?: ConfidenceReport['valueNew']
  newProgress?: ProgressReport['valueNew']
  comment?: ProgressReport['comment']
}

const CheckInForm = ({
  keyResultID,
  afterSubmit,
  gutter,
  submitOnBlur,
  showGoal,
  onCancel,
}: CheckInFormProperties) => {
  const [currentProgress, setCurrentProgress] = useRecoilState(selectCurrentProgress(keyResultID))
  const [confidence, setConfidence] = useRecoilState(selectCurrentConfidence(keyResultID))
  const setConfidenceReport = useSetRecoilState(selectLatestConfidenceReport(keyResultID))
  const [createCheckIn, data] = useMutation(queries.CREATE_CHECK_IN)
  const initialValues: CheckInFormValues = {
    currentProgress,
    confidence,
    newProgress: 0,
    comment: undefined,
  }

  const syncDisabledFields = (
    values: CheckInFormValues,
    actions: FormikHelpers<CheckInFormValues>,
  ) => {
    actions?.setFieldValue('currentProgress', values.newProgress)
  }

  const syncRecoilState = (values: CheckInFormValues) => {
    if (values.newProgress && values.newProgress !== currentProgress)
      setCurrentProgress(values.newProgress)
    if (values.confidence && values.confidence !== confidence) {
      setConfidence(values.confidence)
      setConfidenceReport({ valueNew: values.confidence })
    }
  }

  const dispatchRemoteUpdate = async (
    newProgress: CheckInFormValues['currentProgress'],
    newConfidence: CheckInFormValues['confidence'],
  ) => {
    const checkIn = {
      keyResultId: keyResultID,
      progress: newProgress,
      confidence: newConfidence,
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
    const wasProgressUpdated = values.newProgress !== currentProgress
    const wasConfidenceUpdated = values.confidence !== confidence

    if (wasProgressUpdated || wasConfidenceUpdated) {
      syncDisabledFields(values, actions)
      syncRecoilState(values)

      const newProgress = wasProgressUpdated ? values.newProgress : undefined
      const newConfidence = wasConfidenceUpdated ? values.confidence : undefined

      await dispatchRemoteUpdate(newProgress, newConfidence)

      if (afterSubmit) afterSubmit(newProgress, newConfidence)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FormControl id={`key-result-checkin-${keyResultID?.toString() ?? ''}`}>
            <Flex direction="column" gridGap={8} p={gutter} pb={submitOnBlur ? 0 : gutter}>
              <Flex gridGap={5}>
                <CheckInFormFieldCurrentProgress keyResultID={keyResultID} />
                <CheckInFormFieldNewProgress
                  keyResultID={keyResultID}
                  submitOnBlur={submitOnBlur}
                  isLoading={data.loading}
                />
                {showGoal && <CheckInFormFieldGoal keyResultID={keyResultID} />}
              </Flex>
              <CheckInFormFieldCurrentConfidence
                submitOnBlur={submitOnBlur}
                isLoading={data.loading}
              />

              <CheckInFormFieldComment />

              {!submitOnBlur && <Actions isLoading={data.loading} onCancel={onCancel} />}
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
}

export default CheckInForm
