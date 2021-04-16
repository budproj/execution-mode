export interface GraphQLConnection<N extends GraphQLNode> {
  edges: Array<GraphQLEdge<N>>
}

export interface GraphQLEdge<N extends GraphQLNode> {
  node: N
}

export interface GraphQLNode {
  id: string
  createdAt: string
}
