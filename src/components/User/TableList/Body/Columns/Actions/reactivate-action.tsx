import { MenuItem, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { useReactivateUser } from 'src/components/User/hooks/reactivateUser'
import { User } from 'src/components/User/types'
import selectUser from 'src/state/recoil/user/selector'

import messages from './messages'

interface ReactivateUserProperties {
  id?: User['id']
}

export const ReactivateUser = ({ id }: ReactivateUserProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const { reactivateUser } = useReactivateUser()
  const [user, updateUser] = useRecoilState(selectUser(id))

  const handleReactivateUser = async () => {
    await reactivateUser({
      variables: { id },
      onCompleted: (data) => {
        updateUser(data.reactivateUser)

        toast({
          status: 'success',
          title: intl.formatMessage(messages.successReactivateUserToastMessage, {
            name: user?.firstName,
          }),
        })
      },
    })
  }

  return (
    <MenuItem onClick={handleReactivateUser}>
      {intl.formatMessage(messages.thirdMenuItemOptionII)}
    </MenuItem>
  )
}
