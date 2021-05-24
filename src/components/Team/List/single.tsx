import React from 'react'

import { Team } from '../types'

interface TeamListSingleProperties {
  team?: Team
}

export const TeamListSingle = ({ team }: TeamListSingleProperties) => <p>{team?.id}</p>
