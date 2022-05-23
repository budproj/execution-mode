import React from 'react'

import { ObjectivesViewMode } from 'src/state/recoil/user/objectives-view-mode'

import { UserActiveObjectives } from '../ActiveObjectives/wrapper'
import { UserNotActiveObjectives } from '../NotActiveObjectives/wrapper'
import { User } from '../types'

interface UserObjectivesProperties {
  userID: User['id']
  viewType: ObjectivesViewMode
}

export const UserObjectives = ({ userID, viewType }: UserObjectivesProperties) => {
  console.log({ userID })
  const ViewModeComponentHashmap = {
    [ObjectivesViewMode.ACTIVE]: UserActiveObjectives,
    [ObjectivesViewMode.NOT_ACTIVE]: UserNotActiveObjectives,
  }
  const View = ViewModeComponentHashmap[viewType]

  return <View userID={userID} />
}
