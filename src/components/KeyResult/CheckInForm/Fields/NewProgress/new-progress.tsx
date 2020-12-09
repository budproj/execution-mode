import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultProgressUpdateDraftValue as draftValueAtom } from 'src/state/recoil/key-result/progress-update'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface NewProgressFieldProperties {
  submitOnBlur: boolean
  keyResultID?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const NewProgress = ({ keyResultID, submitOnBlur }: NewProgressFieldProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const [draftValue, setDraftValue] = useRecoilState(draftValueAtom(keyResultID))
  const { values, setFieldValue, submitForm } = useFormikContext<CheckInFormValues>()
  const Mask = selectMaskBasedOnFormat(format)

  const handleChange = (newValue?: string | number) => {
    setFieldValue('newProgress', newValue)
    setDraftValue(newValue as number)
  }

  const handleBlur = async () => {
    if (submitOnBlur) await submitForm()
  }

  useEffect(() => {
    if (values.newProgress !== draftValue) handleChange(draftValue)
  }, [draftValue, setFieldValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask value={values.newProgress} handleChange={handleChange} onBlur={handleBlur} />
    </Box>
  )
}

NewProgress.defaultProps = {
  submitOnBlur: false,
}

export default NewProgress
