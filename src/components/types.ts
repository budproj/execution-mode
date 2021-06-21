import { KeyResultCheckIn } from './KeyResult/types'

export interface GraphQLConnection<N extends GraphQLNode> {
  edges: Array<GraphQLEdge<N>>
  policy: GraphQLConnectionPolicy
  pageInfo: GraphQLPageInfo
}

export interface GraphQLEdge<N extends GraphQLNode> {
  node: N
}

export interface GraphQLNode {
  id: string
  createdAt: string
}

export interface GraphQLConnectionPolicy {
  create: GraphQLEffect
}

export interface GraphQLEntityPolicy {
  read: GraphQLEffect
  update: GraphQLEffect
  delete: GraphQLEffect
}

export interface GraphQLPageInfo {
  endCursor: string
}

export enum GraphQLEffect {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
}

export enum Scope {
  OWNS = 'OWNS',
  TEAM = 'TEAM',
  COMPANY = 'COMPANY',
  ANY = 'ANY',
}

export interface DeleteResult {
  affected: number
}

export interface Status {
  progress: number
  confidence: number
  isOutdated: boolean
  isActive: boolean
  reportDate?: string
  latestCheckIn?: KeyResultCheckIn
}

export interface Delta {
  progress: number
  confidence: number
}
