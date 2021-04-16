import { Dispatch, SetStateAction, useState } from 'react'

import { GraphQLEdge, GraphQLNode } from 'src/components/types'

type ConnectionEdgesHook<N extends GraphQLNode> = [
  N[],
  Dispatch<SetStateAction<Array<GraphQLEdge<N>> | undefined>>,
]

export const useConnectionEdges = <N extends GraphQLNode>(
  initialEdges?: Array<GraphQLEdge<N>>,
): ConnectionEdgesHook<N> => {
  const [edges, setEdges] = useState(initialEdges)

  const nodes = edges?.map((edge) => edge.node) ?? []

  return [nodes, setEdges]
}
