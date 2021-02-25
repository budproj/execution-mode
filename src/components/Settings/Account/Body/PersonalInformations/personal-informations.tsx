import { Stack, Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import EditableField from 'src/components/Base/EditableField'
import SettingsAccountBodySectionTitle from 'src/components/Settings/Account/Body/SectionTitle'
import UserTeamTags from 'src/components/User/TeamTags'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import messages from './messages'

export interface SettingsAccountBodyPersonalInformationsProperties {
  userID?: User['id']
  loading?: boolean
}

const SettingsAccountBodyPersonalInformations = ({
  userID,
  loading,
}: SettingsAccountBodyPersonalInformationsProperties) => {
  const user = useRecoilValue(userAtomFamily(userID))
  const intl = useIntl()

  const isLoaded = !loading && Boolean(user)

  return (
    <Stack direction="column" spacing={6}>
      <SettingsAccountBodySectionTitle
        title={intl.formatMessage(messages.sectionTitle)}
        subtitle={intl.formatMessage(messages.sectionSubtitle)}
      />

      <Stack direction="column" spacing={4}>
        <Flex>
          <EditableField
            label={intl.formatMessage(messages.firstFieldLabel)}
            value={user?.firstName}
            isLoaded={isLoaded}
            flexGrow={1}
          />
          <EditableField
            label={intl.formatMessage(messages.secondFieldLabel)}
            value={user?.lastName}
            isLoaded={isLoaded}
            flexGrow={1}
          />
        </Flex>

        <EditableField
          label={intl.formatMessage(messages.thirdFieldLabel)}
          value={user?.nickname}
          isLoaded={isLoaded}
        />

        <EditableField label={intl.formatMessage(messages.fourthFieldLabel)}>
          <UserTeamTags userID={userID} loading={loading} />
        </EditableField>

        <EditableField
          label={intl.formatMessage(messages.fifthFieldLabel)}
          value={user?.role}
          isLoaded={isLoaded}
        />

        <EditableField
          label={intl.formatMessage(messages.sixthFieldLabel)}
          value={user?.gender}
          isLoaded={isLoaded}
        />

        <EditableField
          label={intl.formatMessage(messages.seventhFieldLabel)}
          value={user?.about}
          isLoaded={isLoaded}
        />
      </Stack>
    </Stack>
  )
}

export default SettingsAccountBodyPersonalInformations
