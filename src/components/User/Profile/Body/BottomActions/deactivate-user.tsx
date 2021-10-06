import { useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { Spinner } from '@chakra-ui/spinner'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { ConfirmationModal } from 'src/components/Base'
import { UserStatus } from 'src/components/User/types'
import selectUser from 'src/state/recoil/user/selector'

import messages from './messages'
import queries from './queries.gql'

type DeactivateUserProperties = {
  userID?: string
  onUserDeactivation?: () => void
}

type DeactivateUserResult = {
  deactivateUser: {
    status: UserStatus
  }
}

export const DeactivateUser = ({ userID, onUserDeactivation }: DeactivateUserProperties) => {
  const intl = useIntl()
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [user, updateUser] = useRecoilState(selectUser(userID))

  const [deactivateUser, { loading }] = useMutation<DeactivateUserResult>(queries.DEACTIVATE_USER, {
    variables: {
      userID,
    },
    onCompleted: (data) => {
      updateUser(data.deactivateUser)
      if (onUserDeactivation) onUserDeactivation()
    },
  })

  const isDisabled = user?.status === UserStatus.INACTIVE && false

  const handleOpenDialog = () => setIsConfirmationDialogOpen(true)
  const handleCloseDialog = () => setIsConfirmationDialogOpen(false)

  const handleClick = () => {
    if (!isDisabled && !loading) handleOpenDialog()
  }

  const handleDeactivation = () => {
    void deactivateUser()
  }

  return (
    <>
      <Button isDisabled={isDisabled} variant="solid" colorScheme="red" onClick={handleClick}>
        {loading ? (
          <Spinner />
        ) : (
          intl.formatMessage(messages.deactivateUserButtonLabel, {
            gender: user?.gender,
          })
        )}
      </Button>

      <ConfirmationModal
        isOpen={isConfirmationDialogOpen}
        titleText={intl.formatMessage(messages.deactivateDialogTitle)}
        confirmationButtonText={intl.formatMessage(messages.deactivateDialogConfirmation)}
        onClose={handleCloseDialog}
        onConfirmation={handleDeactivation}
      />
    </>
  )
}
