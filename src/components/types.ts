export interface GraphQLConnection<N extends GraphQLNode> {
  edges: Array<GraphQLEdge<N>>
  policy: GraphQLPolicy
  pageInfo: GraphQLPageInfo
}

export interface GraphQLEdge<N extends GraphQLNode> {
  node: N
}

export interface GraphQLNode {
  id: string
  createdAt: string
}

export interface GraphQLPolicy {
  create: GraphQLEffect
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
