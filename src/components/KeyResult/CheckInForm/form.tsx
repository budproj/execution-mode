import { Divider, Flex, FormControl, Button, Box } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult, ProgressReport, ConfidenceReport } from 'src/components/KeyResult/types'
import {
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
  keyResultProgressUpdateCurrentConfidence as selectCurrentConfidence,
} from 'src/state/recoil/key-result/progress-update'

import { CurrentProgressField, NewProgressField, CurrentConfidenceField } from './Fields'
import messages from './messages'

export interface CheckInFormProperties {
  keyResultID?: KeyResult['id']
}

export interface CheckInFormValues {
  currentProgress?: ProgressReport['valueNew']
  confidence?: ConfidenceReport['valueNew']
  newProgress?: ProgressReport['valueNew']
}

const CheckInForm = ({ keyResultID }: CheckInFormProperties) => {
  const intl = useIntl()
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const confidence = useRecoilValue(selectCurrentConfidence(keyResultID))
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
        setTimeout(() => {
          actions.setSubmitting(false)
        }, 1000)
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
