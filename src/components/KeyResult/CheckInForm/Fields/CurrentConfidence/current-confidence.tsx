import { Box, FormLabel, MenuItemOption } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import SelectMenu from 'src/components/Base/SelectMenu'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import {
  CONFIDENCE_AT_RISK,
  CONFIDENCE_OUTDATED,
  CONFIDENCE_UPDATED,
  normalizeConfidence,
} from 'src/state/recoil/key-result/selectors/confidence-tag'

import messages from './messages'

export interface CheckInFormCurrentConfidenceProperties {
  submitOnBlur: boolean
  isLoading?: boolean
}

const CurrentConfidence = ({ submitOnBlur, isLoading }: CheckInFormCurrentConfidenceProperties) => {
  const [isSending, setIsSending] = useState(false)
  const intl = useIntl()
  const { values, setFieldValue, submitForm, isSubmitting } = useFormikContext<CheckInFormValues>()
  const normalizedConfidence = normalizeConfidence(values.confidence ?? 50)

  const handleChange = async (newValue: string | string[]) => {
    setFieldValue('confidence', Number.parseInt(newValue as string, 10))
    if (submitOnBlur) {
      setIsSending(true)
      await submitForm()
    }
  }

  useEffect(() => {
    if (!isSubmitting && !isLoading && isSending) setIsSending(false)
  }, [isSubmitting, isLoading, isSending, setIsSending])

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <SelectMenu
        placeholder={<ConfidenceTag confidenceValue={normalizedConfidence} />}
        value={normalizedConfidence.toString()}
        isLoading={isSending}
        onChange={handleChange}
      >
        <MenuItemOption value={CONFIDENCE_UPDATED.max.toString()}>
          <ConfidenceTag confidenceValue={CONFIDENCE_UPDATED.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_AT_RISK.max.toString()}>
          <ConfidenceTag confidenceValue={CONFIDENCE_AT_RISK.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_OUTDATED.max.toString()}>
          <ConfidenceTag confidenceValue={CONFIDENCE_OUTDATED.max} />
        </MenuItemOption>
      </SelectMenu>
    </Box>
  )
}

CurrentConfidence.defaultProps = {
  submitOnBlur: false,
}

export default CurrentConfidence
