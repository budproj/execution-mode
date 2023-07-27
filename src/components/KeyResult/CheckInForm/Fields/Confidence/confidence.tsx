import { Box, Flex, FormLabel, MenuItemOption } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import SelectMenu from 'src/components/Base/SelectMenu'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import {
  CONFIDENCE_HIGH,
  CONFIDENCE_MEDIUM,
  CONFIDENCE_LOW,
  CONFIDENCE_BARRIER,
  CONFIDENCE_DEPRIORITIZED,
  normalizeConfidence,
  CONFIDENCE_ACHIEVED,
} from 'src/state/hooks/useConfidenceTag/hook'

import messages from './messages'

const CheckInFormFieldCurrentConfidence = () => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<CheckInFormValues>()
  const normalizedConfidence = normalizeConfidence(values.confidence)

  const handleChange = async (newValue: string | string[]) => {
    setFieldValue('confidence', Number.parseInt(newValue as string, 10))
  }

  return (
    <Box>
      <Flex alignItems="flex-start">
        <FormLabel flexGrow={1}>{intl.formatMessage(messages.label)}</FormLabel>
        <TooltipWithDelay label={intl.formatMessage(messages.tooltip)} placement="top-end">
          <Flex>
            <InfoCircleIcon
              fill="gray.400"
              stroke="gray.400"
              desc={intl.formatMessage(messages.tooltipIconDesc)}
              cursor="help"
            />
          </Flex>
        </TooltipWithDelay>
      </Flex>
      <SelectMenu
        matchWidth
        placeholder={
          <Flex justifyContent="flex-start">
            <ConfidenceTag confidenceValue={normalizedConfidence} />
          </Flex>
        }
        value={normalizedConfidence.toString()}
        onChange={handleChange}
      >
        <MenuItemOption value={CONFIDENCE_ACHIEVED.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_ACHIEVED.max} />
        </MenuItemOption>
        <MenuItemOption value={CONFIDENCE_HIGH.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_HIGH.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_MEDIUM.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_MEDIUM.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_LOW.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_LOW.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_BARRIER.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_BARRIER.max} />
        </MenuItemOption>
        <MenuItemOption value={CONFIDENCE_DEPRIORITIZED.min.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_DEPRIORITIZED.min} />
        </MenuItemOption>
      </SelectMenu>
    </Box>
  )
}

CheckInFormFieldCurrentConfidence.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCurrentConfidence
