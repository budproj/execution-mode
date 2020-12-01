import { Box, FormLabel } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { NumberFormatProps } from 'react-number-format'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { KeyResult, KeyResultFormat, ProgressReport } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result'
import { keyResultProgressUpdateCurrentProgress as selectCurrentProgress } from 'src/state/recoil/key-result/progress-update'

import messages from './messages'

export interface NewProgressFieldProperties {
  keyResultID?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const NewProgress = ({ keyResultID }: NewProgressFieldProperties) => {
  const intl = useIntl()
  const format = useRecoilValue(formatSelector(keyResultID))
  const setCurrentProgress = useSetRecoilState(selectCurrentProgress(keyResultID))
  const Mask = selectMaskBasedOnFormat(format)

  const parseAndDispatch = (value: NumberFormatProps) => {
    const parserHashmap: Record<KeyResultFormat, (number: number) => number> = {
      [KeyResultFormat.PERCENTAGE]: (number: number) => number / 100,
      [KeyResultFormat.NUMBER]: (number: number) => number,
      [KeyResultFormat.COIN_BRL]: (number: number) => number,
    }

    const formatParser = parserHashmap[format as KeyResultFormat]
    const parsedValue = formatParser(value.floatValue)
    const newValue = parsedValue ?? 0

    setCurrentProgress(newValue)
  }

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <Field name="newProgress">
        {({ field }: FieldProps<ProgressReport['valueNew']>) => (
          <Mask formikField={field} onValueChange={parseAndDispatch} />
        )}
      </Field>
    </Box>
  )
}

export default NewProgress
