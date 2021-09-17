import { useMutation } from '@apollo/client'
import { Divider, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import EditableInputField from 'src/components/Base/EditableInputField'
import { User } from 'src/components/User/types'
import { userSelector } from 'src/state/recoil/user'

import { UserProfileSectionTitle } from '../section-title'

import messages from './messages'
import queries from './queries.gql'

export interface UserProfileSocialMediaProperties {
  userID?: User['id']
  isMyUser?: boolean
  isLoaded?: boolean
  canUpdate?: boolean
}

interface UpdateUserSocialMediaMutationResult {
  updateUser: {
    id: User['id']
    linkedInProfileAddress: User['linkedInProfileAddress']
  }
}

export const UserProfileBodySocialMedia = ({
  userID,
  isMyUser,
  isLoaded,
  canUpdate,
}: UserProfileSocialMediaProperties) => {
  const [user, setUser] = useRecoilState(userSelector(userID))
  const intl = useIntl()
  const [updateUser, { loading }] = useMutation<UpdateUserSocialMediaMutationResult>(
    queries.UPDATE_USER_SOCIAL_MEDIA,
    {
      onCompleted: (data) => {
        setUser(data.updateUser)
      },
    },
  )

  const hasNoSocialMedia = !user?.linkedInProfileAddress || user?.linkedInProfileAddress === ''
  const handleValueUpdate = (key: keyof User) => async (value: string | string[] | null) => {
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

  // eslint-disable-next-line unicorn/no-null
  return hasNoSocialMedia ? null : (
    <>
      <Divider borderColor="black.200" />
      <Stack direction="column" spacing={6} maxW="xl">
        <UserProfileSectionTitle
          title={intl.formatMessage(messages.sectionTitle)}
          subtitle={isMyUser ? intl.formatMessage(messages.sectionSubtitle) : undefined}
        />

        <EditableInputField
          label={intl.formatMessage(messages.firstFieldLabel)}
          value={user?.linkedInProfileAddress}
          isLoaded={isLoaded}
          isSubmitting={loading}
          isDisabled={!canUpdate}
          onSubmit={handleValueUpdate('linkedInProfileAddress')}
        />
      </Stack>
    </>
  )
}
