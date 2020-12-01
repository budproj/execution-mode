import { Box, FormLabel } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface NewProgressFieldProperties {
  keyResultID?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const NewProgress = ({ keyResultID }: NewProgressFieldProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const Mask = selectMaskBasedOnFormat(format)

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
