import { useCallback, useEffect, useState } from 'react'

import { GraphQLEdge, GraphQLNode } from 'src/components/types'

type ConnectionEdgesHook<N extends GraphQLNode> = [
  N[],
  (newEdges?: Array<GraphQLEdge<N>>) => void,
  Array<GraphQLEdge<N>> | undefined,
  boolean,
]

const marshalEdges = <N extends GraphQLNode>(edges?: Array<GraphQLEdge<N>>): N[] =>
  edges?.map((edge) => edge.node) ?? []

export const useConnectionEdges = <N extends GraphQLNode>(
  initialEdges?: Array<GraphQLEdge<N>>,
): ConnectionEdgesHook<N> => {
  const [edges, setEdges] = useState(initialEdges)
  const [nodes, setNodes] = useState(marshalEdges(initialEdges))
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    setNodes(marshalEdges(edges))
    setIsLoaded(true)
  }, [edges, setNodes, setIsLoaded])

  const update = useCallback(
    (newEdges?: Array<GraphQLEdge<N>>): void => {
      setIsLoaded(false)
      setEdges(newEdges)
    },
    [setIsLoaded, setEdges],
  )

  return [nodes, update, edges, isLoaded]
}
