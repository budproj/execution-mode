import { Box, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import { CheckInFormValues } from '../../form'

import messages from './messages'

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export interface CurrentProgressProperties {
  keyResultID?: KeyResult['id']
}

const CurrentProgress = ({ keyResultID }: CurrentProgressProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const { values } = useFormikContext<CheckInFormValues>()
  const Mask = selectMaskBasedOnFormat(format)

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Mask isDisabled value={values.currentProgress} />
    </Box>
  )
}

export default CurrentProgress
