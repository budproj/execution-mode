import React from 'react'

import { ObjectivesViewMode } from 'src/state/recoil/team/objectives-view-mode'

import { UserActiveObjectives } from '../ActiveObjectives/wrapper'
import { UserNotActiveObjectives } from '../NotActiveObjectives/wrapper'
import { User } from '../types'

interface TeamObjectivesProperties {
  userID: User['id']
  viewType: ObjectivesViewMode
}

export const UserObjectives = ({ userID, viewType }: TeamObjectivesProperties) => {
  const ViewModeComponentHashmap = {
    [ObjectivesViewMode.ACTIVE]: UserActiveObjectives,
    [ObjectivesViewMode.NOT_ACTIVE]: UserNotActiveObjectives,
  }
  const View = ViewModeComponentHashmap[viewType]

  return <View userID={userID} />
}
