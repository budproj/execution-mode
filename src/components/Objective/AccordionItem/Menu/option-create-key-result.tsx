import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { keyResultInsertDrawerObjectiveID } from '../../../../state/recoil/key-result/drawers/insert/objective-id'

import { stopAccordionOpen } from './handlers'
import messages from './messages'
import { ObjectiveMenuOption } from './option-base'

interface CreateKeyResultOptionsProperties {
  objectiveID?: string
}

export const CreateKeyResultOption = ({ objectiveID }: CreateKeyResultOptionsProperties) => {
  const intl = useIntl()
  const setKeyResultInsertDrawerObjectiveID = useSetRecoilState(keyResultInsertDrawerObjectiveID)

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setKeyResultInsertDrawerObjectiveID(objectiveID)
    stopAccordionOpen(event)
  }

  return (
    <ObjectiveMenuOption onClick={handleClick}>
      {intl.formatMessage(messages.firstMenuOption)}
    </ObjectiveMenuOption>
  )
}
