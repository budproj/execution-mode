import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import EditableInputField from 'src/components/Base/EditableInputField'
import SettingsAccountBodySectionTitle from 'src/components/Settings/Account/Body/SectionTitle'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import messages from './messages'

export interface SettingsAccountSocialMediaProperties {
  userID?: User['id']
  loading?: boolean
}

const SettingsAccountBodySocialMedia = ({
  userID,
  loading,
}: SettingsAccountSocialMediaProperties) => {
  const user = useRecoilValue(userAtomFamily(userID))
  const intl = useIntl()

  const isLoaded = !loading && Boolean(user)

  return (
    <Stack direction="column" spacing={6}>
      <SettingsAccountBodySectionTitle
        title={intl.formatMessage(messages.sectionTitle)}
        subtitle={intl.formatMessage(messages.sectionSubtitle)}
      />

      <EditableInputField
        label={intl.formatMessage(messages.firstFieldLabel)}
        value={user?.linkedInProfileAddress}
        isLoaded={isLoaded}
      />
    </Stack>
  )
}

export default SettingsAccountBodySocialMedia
