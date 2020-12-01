import { Box, FormLabel } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult, ProgressReport } from 'src/components/KeyResult'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { buildPartialSelector } from 'src/state/recoil/key-result'

import messages from './messages'

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export interface CurrentProgressProperties {
  keyResultID?: KeyResult['id']
}

const CurrentProgress = ({ keyResultID }: CurrentProgressProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const Mask = selectMaskBasedOnFormat(format)

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Field name="currentProgress">
        {({ field }: FieldProps<ProgressReport['valueNew']>) => (
          <Mask isDisabled formikField={field} />
        )}
      </Field>
    </Box>
  )
}

export default CurrentProgress
