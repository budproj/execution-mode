import { Team } from 'src/components/Team/types'
import { GraphQLConnection } from 'src/components/types'

export interface GetTeamsQuery {
  teams: GraphQLConnection<Team>
  me?: {
    get_teams: GraphQLConnection<Team>
    companies: GraphQLConnection<Team>
    teams: GraphQLConnection<Team>
  }
}
