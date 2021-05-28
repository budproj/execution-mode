import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { CheckInFormValues } from '../../form'

import messages from './messages'

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export interface CheckInFormFieldValuePreviousProperties {
  keyResultID?: KeyResult['id']
}

const CheckInFormFieldValuePrevious = ({
  keyResultID,
}: CheckInFormFieldValuePreviousProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const { values } = useFormikContext<CheckInFormValues>()
  const Mask = selectMaskBasedOnFormat(format)

  return (
    <Box flex="1 1 0px">
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask
        isDisabled
        value={values.valuePrevious}
        bg="black.100"
        _disabled={{ opacity: 1, borderColor: 'black.200' }}
      />
    </Box>
  )
}

export default CheckInFormFieldValuePrevious
