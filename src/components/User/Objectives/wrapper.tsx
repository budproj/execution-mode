import React from 'react'

import { ObjectivesViewMode } from 'src/state/recoil/team/objectives-view-mode'

import { UserActiveObjectives } from '../ActiveObjectives/wrapper'

interface TeamObjectivesProperties {
  teamID: string
  userID: string
  viewType: ObjectivesViewMode
}

export const UserObjectives = ({ teamID, userID, viewType }: TeamObjectivesProperties) => {
  const ViewModeComponentHashmap = {
    [ObjectivesViewMode.ACTIVE]: UserActiveObjectives,
    [ObjectivesViewMode.NOT_ACTIVE]: UserActiveObjectives,
  }
  const View = ViewModeComponentHashmap[viewType]

  return <View teamID={teamID} userID={userID} />
}
