import { Box, FormLabel, Input, Stack } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export const CreateCycleInWorkspaceFields = () => {
  const intl = useIntl()

  return (
    <Stack spacing={8}>
      <Box>
        <FormLabel>{intl.formatMessage(messages.yearlyCyclePeriodLabel)}</FormLabel>
        <Field
          name="yearlyCyclePeriod"
          placeholder={intl.formatMessage(messages.yearlyCyclePeriodPlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.yearlyCycleDateStartLabel)}</FormLabel>
        <Field
          name="yearlyCycleDateStart"
          placeholder={intl.formatMessage(messages.yearlyCycleDateStartPlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.yearlyCycleDateEndLabel)}</FormLabel>
        <Field
          name="yearlyCycleDateEnd"
          placeholder={intl.formatMessage(messages.yearlyCycleDateEndPlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.quarterlyCyclePeriodLabel)}</FormLabel>
        <Field
          autoFocus
          name="quarterlyCyclePeriod"
          placeholder={intl.formatMessage(messages.quarterlyCyclePeriodPlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.quarterlyCycleDateStartLabel)}</FormLabel>
        <Field
          name="quarterlyCycleDateStart"
          placeholder={intl.formatMessage(messages.quarterlyCycleDateStartPlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.quarterlyCycleDateEndLabel)}</FormLabel>
        <Field
          name="quarterlyCycleDateEnd"
          placeholder={intl.formatMessage(messages.quarterlyCycleDateEndPlaceholder)}
          as={Input}
        />
      </Box>
    </Stack>
  )
}
