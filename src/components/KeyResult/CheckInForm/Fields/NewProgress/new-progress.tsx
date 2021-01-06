import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { NumberFormatProps } from 'react-number-format'
import { useRecoilState, useRecoilValue } from 'recoil'

import InputWithLoader from 'src/components/Base/InputWithLoader'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface CheckInFormFieldNewProgressProperties {
  submitOnBlur: boolean
  isLoading?: boolean
  keyResultID?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const CheckInFormFieldNewProgress = ({
  keyResultID,
  submitOnBlur,
  isLoading,
}: CheckInFormFieldNewProgressProperties) => {
  const [isSending, setIsSending] = useState(false)
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const [draftValue, setDraftValue] = useRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const { values, setFieldValue, submitForm, isSubmitting } = useFormikContext<CheckInFormValues>()
  const Mask = selectMaskBasedOnFormat(format)

  const handleChange = (newValue?: NumberFormatProps['value']) => {
    setFieldValue('newProgress', newValue)
    setDraftValue(newValue as number)
  }

  const handleBlur = useCallback(async () => {
    if (submitOnBlur) {
      setIsSending(true)
      await submitForm()
    }
  }, [setIsSending, submitOnBlur, submitForm])

  useEffect(() => {
    if (values.newProgress !== draftValue) handleChange(draftValue)
  }, [draftValue, setFieldValue]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isSubmitting && !isLoading && isSending) setIsSending(false)
  }, [isSubmitting, isLoading, isSending, setIsSending])

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask
        value={values.newProgress}
        handleChange={handleChange}
        isLoading={isSending}
        customInput={InputWithLoader}
        onBlur={handleBlur}
      />
    </Box>
  )
}

CheckInFormFieldNewProgress.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldNewProgress
