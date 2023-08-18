import { Team } from 'src/components/Team/types'
import { GraphQLConnection } from 'src/components/types'

export interface GetTeamsQuery {
  teams: GraphQLConnection<Team>
  me?: {
    companies: GraphQLConnection<Team>
    teams: GraphQLConnection<Team>
  }
}
