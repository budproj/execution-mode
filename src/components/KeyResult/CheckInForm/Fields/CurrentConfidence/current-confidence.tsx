import { Box, FormLabel, Select } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { ConfidenceReport, KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

export interface CurrentConfidenceFieldProperties {
  keyResultID?: KeyResult['id']
}

const CurrentConfidence = ({ keyResultID }: CurrentConfidenceFieldProperties) => {
  const intl = useIntl()
  const parseAndDispatch = (value: any) => {
    console.log(intl)
    console.log(value)
    console.log(keyResultID)
  }

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Field name="confidence" as="select">
        {({ field }: FieldProps<ConfidenceReport['valueNew']>) => (
          <Select formikField={field} onValueChange={parseAndDispatch} />
        )}
      </Field>
    </Box>
  )
}

export default CurrentConfidence
