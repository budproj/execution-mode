import { useMutation } from '@apollo/client'
import { Stack, Flex, FormLabel, MenuItemOption } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import EditableInputField from 'src/components/Base/EditableInputField'
import EditableSelectField from 'src/components/Base/EditableSelectField'
import EditableTextAreaField from 'src/components/Base/EditableTextAreaField'
import UserTeamTags from 'src/components/User/TeamTags'
import { USER_GENDER } from 'src/components/User/constants'
import { User } from 'src/components/User/types'
import useIntlGender from 'src/state/hooks/useIntlGender'
import userSelector from 'src/state/recoil/user/selector'

import { UserProfileSectionTitle } from '../section-title'

import messages from './messages'
import queries from './queries.gql'

export interface UserProfileBodyPersonalInformationsProperties {
  isLoaded: boolean
  isMyUser?: boolean
  userID?: User['id']
  canUpdate?: boolean
}

interface UpdateUserInformationMutationResult {
  updateUser: {
    id: User['id']
    firstName: User['firstName']
    lastName: User['lastName']
    fullName: User['fullName']
    nickname: User['nickname']
    role: User['role']
    gender: User['gender']
    about: User['about']
  }
}

export const UserProfileBodyPersonalInformations = ({
  userID,
  isMyUser,
  isLoaded,
  canUpdate,
}: UserProfileBodyPersonalInformationsProperties) => {
  const [user, setUser] = useRecoilState(userSelector(userID))
  const intl = useIntl()
  const [intlGender, setIntlGenderValue, previousGenderValue] = useIntlGender(user?.gender)
  const [maleIntlGender] = useIntlGender(USER_GENDER.MALE)
  const [femaleIntlGender] = useIntlGender(USER_GENDER.FEMALE)
  const [updateUser, { loading }] = useMutation<UpdateUserInformationMutationResult>(
    queries.UPDATE_USER_INFORMATION,
    {
      onCompleted: (data) => {
        setUser(data.updateUser)
      },
    },
  )

  const handleValueUpdate = (key: keyof User) => async (value?: string | string[] | null) => {
    if (user?.[key] === value) return
    // eslint-disable-next-line unicorn/no-null
    if (value === '') value = null

    const userData = {
      [key]: value,
    }

    await updateUser({
      variables: {
        userID,
        userData,
      },
    })
  }

  useEffect(() => {
    if (previousGenderValue !== user?.gender) setIntlGenderValue(user?.gender)
  }, [user?.gender, setIntlGenderValue, previousGenderValue])

  return (
    <Stack direction="column" spacing={6}>
      <UserProfileSectionTitle
        title={intl.formatMessage(messages.sectionTitle)}
        subtitle={isMyUser ? intl.formatMessage(messages.sectionSubtitle) : undefined}
      />

      <Stack direction="column" spacing={4} maxW="xl">
        <Flex gridGap={4}>
          <EditableInputField
            isDisabled={!canUpdate}
            label={intl.formatMessage(messages.firstFieldLabel)}
            value={user?.firstName}
            isLoaded={isLoaded}
            isSubmitting={loading}
            flexGrow={1}
            onSubmit={handleValueUpdate('firstName')}
          />
          <EditableInputField
            label={intl.formatMessage(messages.secondFieldLabel)}
            value={user?.lastName}
            isLoaded={isLoaded}
            isSubmitting={loading}
            isDisabled={!canUpdate}
            flexGrow={1}
            onSubmit={handleValueUpdate('lastName')}
          />
        </Flex>

        <EditableInputField
          label={intl.formatMessage(messages.thirdFieldLabel)}
          value={user?.nickname}
          isLoaded={isLoaded}
          isSubmitting={loading}
          isDisabled={!canUpdate}
          onSubmit={handleValueUpdate('nickname')}
        />

        <Stack direciton="column" spacing={2}>
          <FormLabel fontSize="md" m={0}>
            {intl.formatMessage(messages.fourthFieldLabel)}
          </FormLabel>
          <UserTeamTags userID={userID} isLoaded={isLoaded} />
        </Stack>

        <EditableInputField
          label={intl.formatMessage(messages.fifthFieldLabel)}
          value={user?.role}
          customFallbackValue={intl.formatMessage(messages.fallbackFifthField)}
          isLoaded={isLoaded}
          isSubmitting={loading}
          isDisabled={!canUpdate}
          onSubmit={handleValueUpdate('role')}
        />

        <EditableSelectField
          label={intl.formatMessage(messages.sixthFieldLabel)}
          value={user?.gender}
          placeholder={intlGender}
          customFallbackPlaceholder={intl.formatMessage(messages.fallbackSixthField)}
          isLoaded={isLoaded}
          isDisabled={!canUpdate}
          isSubmitting={loading}
          onChange={handleValueUpdate('gender')}
        >
          <MenuItemOption value={USER_GENDER.MALE}>{maleIntlGender}</MenuItemOption>
          <MenuItemOption value={USER_GENDER.FEMALE}>{femaleIntlGender}</MenuItemOption>
        </EditableSelectField>

        <EditableTextAreaField
          label={intl.formatMessage(messages.seventhFieldLabel, {
            isMyUser,
            gender: user?.gender,
            firstName: user?.firstName,
          })}
          value={user?.about}
          isDisabled={!canUpdate}
          customFallbackValue={intl.formatMessage(messages.fallbackSeventhField, {
            isMyUser,
            gender: user?.gender,
            firstName: user?.firstName,
          })}
          isLoaded={isLoaded}
          isSubmitting={loading}
          onSubmit={handleValueUpdate('about')}
        />
      </Stack>
    </Stack>
  )
}
