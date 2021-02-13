import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { NumberFormatProps } from 'react-number-format'
import { useRecoilValue } from 'recoil'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import messages from './messages'

export interface CheckInFormFieldNewProgressProperties {
  isLoading?: boolean
  keyResultID?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const CheckInFormFieldNewProgress = ({ keyResultID }: CheckInFormFieldNewProgressProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const { values, setFieldValue } = useFormikContext<CheckInFormValues>()

  const Mask = selectMaskBasedOnFormat(format)

  const handleChange = (newValue?: NumberFormatProps['value']) => {
    setFieldValue('newProgress', newValue)
  }

  return (
    <Box flex="1 1 0px">
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask value={values.newProgress} handleChange={handleChange} fontSize="xs" />
    </Box>
  )
}

CheckInFormFieldNewProgress.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldNewProgress
