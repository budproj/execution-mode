import { useMutation } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { teamActiveObjectives } from '../../../../state/recoil/team/active-objectives'
import { ConfirmationDialog } from '../../../Base/ConfirmationDialog/wrapper'
import { DeleteResult } from '../../../types'
import { stopAccordionOpen } from '../handlers'

import messages from './messages'
import { ObjectiveMenuOption } from './option-base'
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
      <ObjectiveMenuOption onClick={handleClick}>
        {intl.formatMessage(messages.thirdMenuOption)}
      </ObjectiveMenuOption>
      <ConfirmationDialog
        dangerousAction
        isOpen={isDialogOpen}
        type={intl.formatMessage(messages.deleteObjectiveDialogType)}
        description={intl.formatMessage(messages.deleteObjectiveDescription)}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </>
  )
}
