import { Box, FormLabel, MenuItemOption } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
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

const CurrentConfidence = () => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<CheckInFormValues>()
  const normalizedConfidence = normalizeConfidence(values.confidence ?? 50)
  const handleChange = (newValue: string | string[]) => setFieldValue('confidence', newValue)

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <SelectMenu
        placeholder={<ConfidenceTag confidenceValue={normalizedConfidence} />}
        value={normalizedConfidence.toString()}
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

export default CurrentConfidence
