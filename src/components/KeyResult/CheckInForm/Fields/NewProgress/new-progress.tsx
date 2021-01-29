import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { NumberFormatProps } from 'react-number-format'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface CheckInFormFieldNewProgressProperties {
  isLoading?: boolean
  keyResultID?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const CheckInFormFieldNewProgress = ({
  keyResultID,
  isLoading,
}: CheckInFormFieldNewProgressProperties) => {
  const [isSending, setIsSending] = useState(false)
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const { values, setFieldValue, isSubmitting } = useFormikContext<CheckInFormValues>()

  const Mask = selectMaskBasedOnFormat(format)

  const handleChange = (newValue?: NumberFormatProps['value']) => {
    setFieldValue('newProgress', newValue)
    setDraftValue(newValue as number)
  }

  useEffect(() => {
    if (!isSubmitting && !isLoading && isSending) setIsSending(false)
  }, [isSubmitting, isLoading, isSending, setIsSending])

  return (
    <Box flex="1 1 0px">
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask value={values.newProgress} handleChange={handleChange} isLoading={isSending} />
    </Box>
  )
}

CheckInFormFieldNewProgress.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldNewProgress
