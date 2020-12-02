import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultProgressUpdateCurrentProgress as selectCurrentProgress } from 'src/state/recoil/key-result/progress-update'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface NewProgressFieldProperties {
  keyResultID?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const NewProgress = ({ keyResultID }: NewProgressFieldProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const { values, setFieldValue } = useFormikContext<CheckInFormValues>()
  const Mask = selectMaskBasedOnFormat(format)

  const handleChange = (newValue?: string | number) => setFieldValue('newProgress', newValue)

  useEffect(() => {
    if (values.newProgress !== currentProgress) handleChange(currentProgress)
  }, [currentProgress, setFieldValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask value={values.newProgress} handleChange={handleChange} />
    </Box>
  )
}

export default NewProgress
