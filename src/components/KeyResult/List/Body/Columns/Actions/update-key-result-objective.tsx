import { MenuItem, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { UpdateModal } from 'src/components/KeyResult/UpdateModal'
import { KeyResult } from 'src/services/key-result/@types'
import { Objective } from 'src/services/objective/@types'

import { useUpdateKeyResult } from './hooks/get-update-key-result'
import messages from './messages'

interface UpdateKeyResultObjectiveOptionProperties {
  keyResultId: KeyResult['id']
  value?: string
  data?: Objective[]
}

const transformObjectiveToMap = (objective: Objective[]) => {
  const objectEntries = Object.values(objective)

  return new Map(objectEntries.map((object) => [object.id, object.title]))
}

export const UpdateKeyResultObjectiveOption = ({
  keyResultId,
  value,
  data,
}: UpdateKeyResultObjectiveOptionProperties) => {
  const intl = useIntl()
  const toast = useToast()

  const { mutateAsync: updateKR } = useUpdateKeyResult()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isDialogOpen) setIsDialogOpen(true)
    event.stopPropagation()
  }

  const handleSelect = async (objectiveId: string) => {
    const kr = await updateKR({
      keyResultId,
      data: { objectiveId },
    })

    if (kr) {
      toast({
        status: 'success',
        title: intl.formatMessage(messages.updateKeyResultObjectiveSucessToastMessage),
      })
    } else {
      toast({
        status: 'error',
        title: intl.formatMessage(messages.deleteErrorToastMessage),
      })
    }
  }

  return (
    <>
      <MenuItem onClick={handleClick}>
        {intl.formatMessage(messages.transferButtonMessage)}
      </MenuItem>
      {data && value && (
        <UpdateModal
          value={value}
          data={transformObjectiveToMap(data)}
          updateType="Objetivo"
          isOpen={isDialogOpen}
          onClose={handleClose}
          onSubmit={handleSelect}
        />
      )}
    </>
  )
}
