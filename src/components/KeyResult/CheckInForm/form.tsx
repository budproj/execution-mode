import { Flex, FormControl } from '@chakra-ui/react'
import { Formik } from 'formik'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { keyResultProgressUpdateCurrentProgress as selectCurrentProgress } from 'src/state/recoil/key-result/progress-update'

import { KeyResult, ProgressReport } from '../types'

import { CurrentProgressField, NewProgressField, CurrentConfidenceField } from './Fields'

export interface CheckInFormProperties {
  keyResultID?: KeyResult['id']
}

export interface CheckInFormValues {
  currentProgress?: ProgressReport['valueNew']
  newProgress?: ProgressReport['valueNew']
}

const CheckInForm = ({ keyResultID }: CheckInFormProperties) => {
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const initialValues: CheckInFormValues = {
    currentProgress,
    newProgress: 0,
  }

  const hasLoadedAllValues = typeof currentProgress !== 'undefined'

  return hasLoadedAllValues ? (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        console.log('ok')
      }}
    >
      {() => (
        <FormControl id={`key-result-checkin-${keyResultID?.toString() ?? ''}`}>
          <CurrentConfidenceField keyResultID={keyResultID} />
          <Flex gridGap={5}>
            <CurrentProgressField keyResultID={keyResultID} />
            <NewProgressField keyResultID={keyResultID} />
          </Flex>
        </FormControl>
      )}
    </Formik>
  ) : (
    <p>Loading...</p>
  )
}

export default CheckInForm
