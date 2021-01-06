import { Box, FormLabel, MenuItemOption } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import SelectMenu from 'src/components/Base/SelectMenu'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import {
  CONFIDENCE_HIGH,
  CONFIDENCE_MEDIUM,
  CONFIDENCE_LOW,
  normalizeConfidence,
} from 'src/state/recoil/key-result/selectors/confidence-tag'

import messages from './messages'

export interface CheckInFormFieldCurrentConfidenceProperties {
  submitOnBlur: boolean
  isLoading?: boolean
}

const CheckInFormFieldCurrentConfidence = ({
  submitOnBlur,
  isLoading,
}: CheckInFormFieldCurrentConfidenceProperties) => {
  const [isSending, setIsSending] = useState(false)
  const intl = useIntl()
  const { values, setFieldValue, submitForm, isSubmitting } = useFormikContext<CheckInFormValues>()
  const normalizedConfidence = normalizeConfidence(values.confidence)

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
        <MenuItemOption value={CONFIDENCE_HIGH.max.toString()}>
          <ConfidenceTag confidenceValue={CONFIDENCE_HIGH.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_MEDIUM.max.toString()}>
          <ConfidenceTag confidenceValue={CONFIDENCE_MEDIUM.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_LOW.max.toString()}>
          <ConfidenceTag confidenceValue={CONFIDENCE_LOW.max} />
        </MenuItemOption>
      </SelectMenu>
    </Box>
  )
}

CheckInFormFieldCurrentConfidence.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCurrentConfidence
