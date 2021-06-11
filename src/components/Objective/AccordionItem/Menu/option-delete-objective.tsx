import React from 'react'
import { useIntl } from 'react-intl'

import { stopAccordionOpen } from '../handlers'

import messages from './messages'
import { ObjectiveMenuOption } from './option-base'

interface DeleteObjectiveOptionProperties {
  objectiveID?: string
}

export const DeleteObjectiveOption = ({ objectiveID }: DeleteObjectiveOptionProperties) => {
  const intl = useIntl()

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    stopAccordionOpen(event)
  }

  return (
    <ObjectiveMenuOption onClick={handleClick}>
      {intl.formatMessage(messages.thirdMenuOption)}
    </ObjectiveMenuOption>
  )
}
