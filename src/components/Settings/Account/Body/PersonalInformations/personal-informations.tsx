import { Stack, Flex, FormLabel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import EditableInputField from 'src/components/Base/EditableInputField'
import SettingsAccountBodySectionTitle from 'src/components/Settings/Account/Body/SectionTitle'
import UserTeamTags from 'src/components/User/TeamTags'
import { User } from 'src/components/User/types'
import useIntlGender from 'src/state/hooks/useIntlGender'
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
  const [gender, setGenderValue, previousGenderValue] = useIntlGender(user?.gender)

  const isLoaded = !loading && Boolean(user)

  useEffect(() => {
    if (previousGenderValue !== user?.gender) setGenderValue(user?.gender)
  }, [user?.gender, setGenderValue, previousGenderValue])

  return (
    <Stack direction="column" spacing={6}>
      <SettingsAccountBodySectionTitle
        title={intl.formatMessage(messages.sectionTitle)}
        subtitle={intl.formatMessage(messages.sectionSubtitle)}
      />

      <Stack direction="column" spacing={4} maxW="xl">
        <Flex gridGap={4}>
          <EditableInputField
            label={intl.formatMessage(messages.firstFieldLabel)}
            value={user?.firstName}
            isLoaded={isLoaded}
            flexGrow={1}
          />
          <EditableInputField
            label={intl.formatMessage(messages.secondFieldLabel)}
            value={user?.lastName}
            isLoaded={isLoaded}
            flexGrow={1}
          />
        </Flex>

        <EditableInputField
          label={intl.formatMessage(messages.thirdFieldLabel)}
          value={user?.nickname}
          isLoaded={isLoaded}
        />

        <Stack direciton="column" spacing={2}>
          <FormLabel fontSize="sm" m={0}>
            {intl.formatMessage(messages.fourthFieldLabel)}
          </FormLabel>
          <UserTeamTags userID={userID} loading={loading} />
        </Stack>

        <EditableInputField
          label={intl.formatMessage(messages.fifthFieldLabel)}
          value={user?.role}
          customFallbackValue={intl.formatMessage(messages.fallbackFifthField)}
          isLoaded={isLoaded}
        />

        <EditableInputField
          label={intl.formatMessage(messages.sixthFieldLabel)}
          value={gender}
          customFallbackValue={intl.formatMessage(messages.fallbackSixthField)}
          isLoaded={isLoaded}
        />

        <EditableInputField
          label={intl.formatMessage(messages.seventhFieldLabel)}
          value={user?.about}
          customFallbackValue={intl.formatMessage(messages.fallbackSeventhField)}
          isLoaded={isLoaded}
        />
      </Stack>
    </Stack>
  )
}

export default SettingsAccountBodyPersonalInformations
