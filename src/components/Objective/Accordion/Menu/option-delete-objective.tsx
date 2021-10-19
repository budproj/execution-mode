import { useMutation } from '@apollo/client'
import { MenuItem, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { DangerousActionConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/DangerousAction/wrapper'

import { teamActiveObjectives } from '../../../../state/recoil/team/active-objectives'
import { DeleteResult } from '../../../types'
import { stopAccordionOpen } from '../handlers'

import messages from './messages'
import queries from './queries.gql'

interface DeleteObjectiveOptionProperties {
  objectiveID?: string
  teamID?: string
  onDelete?: (id?: string) => void
}

interface DeleteObjectiveMutationResult {
  deleteObjective: DeleteResult
}

export const DeleteObjectiveOption = ({
  objectiveID,
  teamID,
  onDelete,
}: DeleteObjectiveOptionProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeObjectives, setActiveObjectives] = useRecoilState(teamActiveObjectives(teamID))
  const toast = useToast()
  const intl = useIntl()
  const [deleteObjective, { data, error }] = useMutation<DeleteObjectiveMutationResult>(
    queries.DELETE_OBJECTIVE,
    {
      variables: {
        objectiveID,
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
    setActiveObjectives(activeObjectives?.filter((edge) => edge.node.id !== objectiveID))
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
