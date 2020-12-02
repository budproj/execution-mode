import { useMutation } from '@apollo/client'
import { Divider, Flex, FormControl, Button, Box } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { KeyResult, ProgressReport, ConfidenceReport } from 'src/components/KeyResult/types'
import {
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
  keyResultProgressUpdateCurrentConfidence as selectCurrentConfidence,
} from 'src/state/recoil/key-result/progress-update'

import { CurrentProgressField, NewProgressField, CurrentConfidenceField } from './Fields'
import messages from './messages'
import queries from './queries.gql'

export interface CheckInFormProperties {
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

const CheckInForm = ({ keyResultID, afterSubmit }: CheckInFormProperties) => {
  const intl = useIntl()
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
    syncDisabledFields(values, actions)
    syncRecoilState(values)
    await dispatchRemoteUpdate(values)

    if (afterSubmit) afterSubmit(values.newProgress, values.confidence)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FormControl id={`key-result-checkin-${keyResultID?.toString() ?? ''}`}>
            <Flex direction="column" gridGap={5} px={8} py={8}>
              <CurrentConfidenceField />
              <Flex gridGap={5}>
                <CurrentProgressField keyResultID={keyResultID} />
                <NewProgressField keyResultID={keyResultID} />
              </Flex>
            </Flex>

            <Divider />

            <Box textAlign="center" pt={6} px={8}>
              <Button variant="solid" type="submit" isLoading={data.loading}>
                {intl.formatMessage(messages.save)}
              </Button>
            </Box>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

export default CheckInForm
