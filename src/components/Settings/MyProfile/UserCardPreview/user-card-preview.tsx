import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { UserProfileSectionTitle } from 'src/components/User/Profile/Body/section-title'
import UserProfileCard from 'src/components/User/ProfileCard'
import { User } from 'src/components/User/types'

import messages from './messages'

export interface SettingsAccountUserCardPreviewProperties {
  userID?: User['id']
}

const SettingsAccountUserCardPreview = ({ userID }: SettingsAccountUserCardPreviewProperties) => {
  const intl = useIntl()

  return (
    <Stack direction="column" spacing={4}>
      <UserProfileSectionTitle
        title={intl.formatMessage(messages.title)}
        subtitle={intl.formatMessage(messages.subtitle)}
      />

      <Box borderColor="gray.100" borderWidth={2} borderRadius={4} maxW={52}>
        <UserProfileCard userID={userID} />
      </Box>
    </Stack>
  )
}

export default SettingsAccountUserCardPreview
