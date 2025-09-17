import { MenuItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { keyResultInsertDrawerObjectiveID } from '../../../../../state/recoil/key-result/drawers/insert/objective-id'
import { Objective } from '../../../types'
import { stopAccordionOpen } from '../../handlers'
import messages from '../messages'

interface CreateKeyResultOptionProperties {
  objectiveID?: Objective['id']
}

export const CreateKeyResultOption = ({ objectiveID }: CreateKeyResultOptionProperties) => {
  const intl = useIntl()
  const setKeyResultInsertDrawerObjectiveID = useSetRecoilState(keyResultInsertDrawerObjectiveID)

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setKeyResultInsertDrawerObjectiveID(objectiveID)
    stopAccordionOpen(event)
  }

  return <MenuItem onClick={handleClick}>{intl.formatMessage(messages.secondMenuOption)}</MenuItem>
}
