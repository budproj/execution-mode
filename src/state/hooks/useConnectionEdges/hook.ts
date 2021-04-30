import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { GraphQLEdge, GraphQLNode } from 'src/components/types'

type ConnectionEdgesHook<N extends GraphQLNode> = [
  N[],
  Dispatch<SetStateAction<Array<GraphQLEdge<N>> | undefined>>,
  Dispatch<SetStateAction<N[]>>,
]

const marshalEdges = <N extends GraphQLNode>(edges?: Array<GraphQLEdge<N>>): N[] =>
  edges?.map((edge) => edge.node) ?? []

export const useConnectionEdges = <N extends GraphQLNode>(
  initialEdges?: Array<GraphQLEdge<N>>,
): ConnectionEdgesHook<N> => {
  const [edges, setEdges] = useState(initialEdges)
  const [nodes, setNodes] = useState(marshalEdges(initialEdges))

  useEffect(() => {
    setNodes(marshalEdges(edges))
  }, [edges, setNodes])

  return [nodes, setEdges, setNodes]
}
