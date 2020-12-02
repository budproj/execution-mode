import { Divider, Flex, FormControl, Button, Box } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
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
  const initialValues: CheckInFormValues = {
    currentProgress,
    confidence,
    newProgress: 0,
  }

  const hasLoadedAllValues = typeof currentProgress !== 'undefined'

  return hasLoadedAllValues ? (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        actions.setFieldValue('currentProgress', values.newProgress)

        setCurrentProgress(values.newProgress)
        if (values.confidence !== confidence) setConfidence(values.confidence)

        actions.setSubmitting(false)
        if (afterSubmit) afterSubmit(values.newProgress, values.confidence)
      }}
    >
      {({ isSubmitting }) => (
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
              <Button variant="solid" type="submit" isLoading={isSubmitting}>
                {intl.formatMessage(messages.save)}
              </Button>
            </Box>
          </FormControl>
        </Form>
      )}
    </Formik>
  ) : (
    <p>Loading...</p>
  )
}

export default CheckInForm
