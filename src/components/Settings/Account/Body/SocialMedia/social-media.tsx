import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { EditableField } from 'src/components/Base'
import SettingsAccountBodySectionTitle from 'src/components/Settings/Account/Body/SectionTitle'

import messages from './messages'

const SettingsAccountBodySocialMedia = () => {
  const intl = useIntl()

  return (
    <Stack direction="column" spacing={6}>
      <SettingsAccountBodySectionTitle
        title={intl.formatMessage(messages.sectionTitle)}
        subtitle={intl.formatMessage(messages.sectionSubtitle)}
      />

      <EditableField
        label={intl.formatMessage(messages.firstFieldLabel)}
        value="https://br.linkedin.com/brunodelorence"
      />
    </Stack>
  )
}

export default SettingsAccountBodySocialMedia
