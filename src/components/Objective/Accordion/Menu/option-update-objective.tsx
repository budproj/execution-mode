import { MenuItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { ObjectiveViewMode, setObjectiveToMode } from 'src/state/recoil/objective/context'

import { stopAccordionOpen } from '../handlers'

import messages from './messages'

interface UpdateObjectiveOptionProperties {
  objectiveID?: string
}

export const UpdateObjectiveOption = ({ objectiveID }: UpdateObjectiveOptionProperties) => {
  const setObjectiveToEditMode = useSetRecoilState(setObjectiveToMode(ObjectiveViewMode.EDIT))
  const intl = useIntl()

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setObjectiveToEditMode(objectiveID)
    stopAccordionOpen(event)
  }

  return <MenuItem onClick={handleClick}>{intl.formatMessage(messages.firstMenuOption)}</MenuItem>
}
