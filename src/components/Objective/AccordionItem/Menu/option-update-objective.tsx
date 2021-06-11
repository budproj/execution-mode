import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { objectiveAccordionIndexesBeingEdited } from '../../../../state/recoil/objective/accordion'
import { stopAccordionOpen } from '../handlers'

import messages from './messages'
import { ObjectiveMenuOption } from './option-base'

interface UpdateObjectiveOptionProperties {
  accordionIndex: number
  accordionID?: string
}

export const UpdateObjectiveOption = ({
  accordionID,
  accordionIndex,
}: UpdateObjectiveOptionProperties) => {
  const setObjectiveToEditMode = useSetRecoilState(
    objectiveAccordionIndexesBeingEdited(accordionID),
  )
  const intl = useIntl()

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setObjectiveToEditMode(accordionIndex)
    stopAccordionOpen(event)
  }

  return (
    <ObjectiveMenuOption onClick={handleClick}>
      {intl.formatMessage(messages.secondMenuOption)}
    </ObjectiveMenuOption>
  )
}
