import { Box, FormLabel } from '@chakra-ui/react'
import { Field, FieldProps, useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'
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

  useEffect(() => {
    if (values.newProgress !== currentProgress) setFieldValue('newProgress', currentProgress)
  }, [currentProgress, setFieldValue])

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Field name="newProgress">
        {({ field }: FieldProps<ProgressReport['valueNew']>) => <Mask formikField={field} />}
      </Field>
    </Box>
  )
}

export default NewProgress
