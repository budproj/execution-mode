import { Stack, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { LocaleSwitcher } from 'src/components/Base/LocaleSwitcher'

import messages from './messages'

export const SettingsPlatform = () => {
  const intl = useIntl()

  return (
    <Stack spacing={0}>
      <FormLabel fontSize="md" m={0}>
        {intl.formatMessage(messages.localeSwitcherLabel)}
      </FormLabel>
      <LocaleSwitcher />
    </Stack>
  )
}
