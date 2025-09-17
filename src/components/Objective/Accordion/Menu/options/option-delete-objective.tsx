import { useMutation } from '@apollo/client'
import { MenuItem, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { DangerousActionConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/DangerousAction/wrapper'
import { useGetTeamObjective } from 'src/components/Team/hooks/getTeamActiveObjectives/get-team-objective-queries'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { userActiveObjectives } from 'src/state/recoil/user/active-objectives'

import { teamActiveObjectives } from '../../../../../state/recoil/team/active-objectives'
import { DeleteResult } from '../../../../types'
import { Objective } from '../../../types'
import { stopAccordionOpen } from '../../handlers'
import messages from '../messages'
import queries from '../queries.gql'

interface DeleteObjectiveOptionProperties {
  objectiveID?: Objective['id']
  userID?: User['id']
  teamID?: Team['id']
  onDelete?: (id?: string) => void
}

interface DeleteObjectiveMutationResult {
  deleteObjective: DeleteResult
}

export const DeleteObjectiveOption = ({
  objectiveID,
  userID,
  teamID,
  onDelete,
}: DeleteObjectiveOptionProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { refetch } = useGetTeamObjective(teamID)

  const [activeObjectives, setActiveObjectives] = useRecoilState(
    userID ? userActiveObjectives(userID) : teamActiveObjectives(teamID),
  )
  const toast = useToast()
  const intl = useIntl()
  const [deleteObjective, { data, error }] = useMutation<DeleteObjectiveMutationResult>(
    queries.DELETE_OBJECTIVE,
    {
      variables: {
        objectiveID,
      },
      onCompleted: () => {
        if (userID) {
          setActiveObjectives(activeObjectives?.filter((edge) => edge.node.id !== objectiveID))
        } else {
          void refetch()
        }
      },
    },
  )

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isDialogOpen) setIsDialogOpen(true)
    stopAccordionOpen(event)
  }

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  const handleDelete = async () => {
    await deleteObjective()

    if (onDelete) onDelete(objectiveID)
  }

  useEffect(() => {
    if (data) {
      toast({
        title: intl.formatMessage(messages.deleteObjectiveSuccessToastMessage),
        status: 'success',
      })
    }
  }, [data, toast, intl])

  useEffect(() => {
    if (error) {
      toast({
        title: intl.formatMessage(messages.deleteObjectiveErrorToastMessage),
        status: 'error',
      })
    }
  }, [error, toast, intl])

  return (
    <>
      <MenuItem onClick={handleClick}>{intl.formatMessage(messages.thirdMenuOption)}</MenuItem>
      <DangerousActionConfirmationDialog
        isOpen={isDialogOpen}
        keyword={intl.formatMessage(messages.deleteDialogKeyword)}
        firstStageTitle={intl.formatMessage(messages.deleteObjectiveFirstStageTitle)}
        firstStageDescription={intl.formatMessage(messages.deleteObjectiveFirstStageDescription)}
        confirmationLabel={intl.formatMessage(messages.deleteDialogConfirmationLabel)}
        onConfirm={handleDelete}
        onClose={handleClose}
      />
    </>
  )
}
