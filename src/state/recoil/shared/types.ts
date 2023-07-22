import { Team } from '../../../components/Team/types'
import { User, UserProgress } from '../../../components/User/types'
import { GraphQLConnection, GraphQLNode } from '../../../components/types'

export interface MySettings extends GraphQLNode {
  key: string
  value: string
}

export type Myself = GraphQLNode &
  Required<
    Pick<
      User,
      // TODO: map all primitive types from User
      | 'id'
      | 'firstName'
      | 'lastName'
      | 'fullName'
      | 'picture'
      | 'email'
      | 'gender'
      | 'role'
      | 'authzSub'
      | 'authzRole'
      | 'createdAt'
      | 'updatedAt'
    > & {
      isTeamLeader: boolean
      settings: GraphQLConnection<MySettings>
      // TODO: properly type subset
      companies: GraphQLConnection<Team>
      // TODO: properly type subset
      teams: GraphQLConnection<Team>
      // TODO: properly type subset
      yearlyProgress: UserProgress
      // TODO: properly type subset
      quarterlyProgress: UserProgress
    }
  >

export type MyselfResult = { me: Myself }
