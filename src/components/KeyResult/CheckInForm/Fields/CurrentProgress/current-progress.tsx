import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import { CheckInFormValues } from '../../form'

import messages from './messages'

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export interface CheckInFormFieldCurrentProgressProperties {
  keyResultID?: KeyResult['id']
}

const CheckInFormFieldCurrentProgress = ({
  keyResultID,
}: CheckInFormFieldCurrentProgressProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const { values } = useFormikContext<CheckInFormValues>()
  const Mask = selectMaskBasedOnFormat(format)

  return (
    <Box flex="1 1 0px">
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask isDisabled value={values.currentProgress} bg="gray.50" />
    </Box>
  )
}

export default CheckInFormFieldCurrentProgress
