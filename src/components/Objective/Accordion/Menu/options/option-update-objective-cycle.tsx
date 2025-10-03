import { MenuItem, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { UpdateModal } from 'src/components/KeyResult/UpdateModal'
import { Objective } from 'src/components/Objective/types'
import { Cycle } from 'src/services/cycle/@types'

import { useUpdateObjective } from '../hooks/get-update-objective'
import messages from '../messages'

interface UpdateObjectiveCycleOptionProperties {
  objectiveId: Objective['id']
  value?: string
  data?: Cycle[]
}

const transformCycleToMap = (cycle: Cycle[]) => {
  const objectEntries = Object.values(cycle)

  return new Map(objectEntries.map((object) => [object.id, object.period]))
}

export const UpdateObjectiveCycleOption = ({
  objectiveId,
  value,
  data,
}: UpdateObjectiveCycleOptionProperties) => {
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

  const handleSelect = async (cycleId: string) => {
    const objective = await updateObjective({
      objectiveId,
      data: { cycleId },
    })

    if (objective) {
      toast({
        status: 'success',
        title: intl.formatMessage(messages.updateObjectiveSucessToastCycleMessage),
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
      <MenuItem onClick={handleClick}>{intl.formatMessage(messages.fifthMenuOption)}</MenuItem>
      {value && data && (
        <UpdateModal
          value={value}
          data={transformCycleToMap(data)}
          updateType="Ciclo"
          isOpen={isDialogOpen}
          onClose={handleClose}
          onSubmit={handleSelect}
        />
      )}
    </>
  )
}
