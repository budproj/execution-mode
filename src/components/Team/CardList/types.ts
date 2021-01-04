import { Team } from 'src/components/Team/types'

export interface GetTeamsQuery {
  teams: Array<Partial<Team>>
}
