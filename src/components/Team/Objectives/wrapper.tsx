import React from 'react'
import { useRecoilValue } from 'recoil'

import {
  ObjectivesViewMode,
  teamObjectivesViewMode,
} from '../../../state/recoil/team/objectives-view-mode'
import { TeamActiveObjectives } from '../ActiveObjectives/wrapper'
import { TeamNotActiveObjectives } from '../NotActiveObjectives/wrapper'

interface TeamObjectivesProperties {
  teamID: string
}

export const TeamObjectives = ({ teamID }: TeamObjectivesProperties) => {
  const viewMode = useRecoilValue(teamObjectivesViewMode(teamID))

  const ViewModeComponentHashmap = {
    [ObjectivesViewMode.ACTIVE]: TeamActiveObjectives,
    [ObjectivesViewMode.NOT_ACTIVE]: TeamNotActiveObjectives,
  }
  const View = ViewModeComponentHashmap[viewMode]

  return <View teamID={teamID} />
}
