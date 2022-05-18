import React from 'react'

import { ObjectivesViewMode } from 'src/state/recoil/team/objectives-view-mode'

import { ActiveObjectives } from '../ActiveObjectives/wrapper'

interface TeamObjectivesProperties {
  teamID: string
  userID: string
  viewType: ObjectivesViewMode
}

export const UserObjectives = ({ teamID, userID, viewType }: TeamObjectivesProperties) => {
  const ViewModeComponentHashmap = {
    [ObjectivesViewMode.ACTIVE]: ActiveObjectives,
    [ObjectivesViewMode.NOT_ACTIVE]: ActiveObjectives,
  }
  const View = ViewModeComponentHashmap[viewType]

  return <View teamID={teamID} userID={userID} />
}
