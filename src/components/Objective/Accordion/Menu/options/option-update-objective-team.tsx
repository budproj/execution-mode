import { MenuItem, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { UpdateModal } from 'src/components/KeyResult/UpdateModal'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/services/team/@types'

import { useUpdateObjective } from '../hooks/get-update-objective'
import messages from '../messages'

interface UpdateObjectiveTeamOptionProperties {
  objectiveId: Objective['id']
  value?: string
  data?: Team[]
}

const transformTeamToMap = (team: Team[]) => {
  const objectEntries = Object.values(team)

  return new Map(objectEntries.map((object) => [object.id, object.name]))
}

export const UpdateObjectiveTeamOption = ({
  objectiveId,
  value,
  data,
}: UpdateObjectiveTeamOptionProperties) => {
  const intl = useIntl()
  const toast = useToast()

  const { mutateAsync: updateObjective } = useUpdateObjective()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isDialogOpen) setIsDialogOpen(true)
    event.stopPropagation()
  }

  const handleSelect = async (teamId: string) => {
    const objective = await updateObjective({
      objectiveId,
      data: { teamId },
    })

    if (objective) {
      toast({
        status: 'success',
        title: intl.formatMessage(messages.updateObjectiveSucessToastTeamMessage),
      })
    } else {
      toast({
        status: 'error',
        title: intl.formatMessage(messages.updateObjectiveErrorToastMessage),
      })
    }
  }

  return (
    <>
      <MenuItem onClick={handleClick}>{intl.formatMessage(messages.fourthMenuOption)}</MenuItem>
      {data && value && (
        <UpdateModal
          value={value}
          data={transformTeamToMap(data)}
          updateType="Time"
          isOpen={isDialogOpen}
          onClose={handleClose}
          onSubmit={handleSelect}
        />
      )}
    </>
  )
}
