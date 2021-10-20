import { useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { Spinner } from '@chakra-ui/spinner'
import { useToast } from '@chakra-ui/toast'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { KeywordBasedConfirmation } from 'src/components/Base/Dialogs/Confirmation/KeywordBased/wrapper'
import { UserStatus } from 'src/components/User/types'
import selectUser from 'src/state/recoil/user/selector'

import { DialogImageWrapper } from './dialog-image-wrapper'
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
  const toast = useToast()

  const [deactivateUser, { loading }] = useMutation<DeactivateUserResult>(queries.DEACTIVATE_USER, {
    variables: {
      userID,
    },
    onCompleted: (data) => {
      updateUser(data.deactivateUser)
      if (onUserDeactivation) onUserDeactivation()

      toast({
        status: 'success',
        title: intl.formatMessage(messages.deactivatedConfirmationToast, {
          name: user?.firstName,
        }),
      })
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
      <KeywordBasedConfirmation
        headerImageURL={user?.picture}
        HeaderImageWrapper={DialogImageWrapper}
        isOpen={isConfirmationDialogOpen}
        keyword={intl.formatMessage(messages.deactivateDialogKeyword)}
        title={intl.formatMessage(messages.deactivateDialogTitle, {
          gender: user?.gender,
          name: user?.firstName,
        })}
        description={intl.formatMessage(messages.deactivateDialogDescription, {
          name: user?.firstName,
        })}
        onClose={handleCloseDialog}
        onConfirm={handleDeactivation}
      />
    </>
  )
}