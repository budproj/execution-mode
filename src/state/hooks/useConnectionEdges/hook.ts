import { useCallback, useMemo, useState } from 'react'

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
  const [isLoaded, setIsLoaded] = useState(Boolean(initialEdges))

  const nodes = useMemo(() => marshalEdges(edges), [edges])

  const update = useCallback(
    (newEdges?: Array<GraphQLEdge<N>>): N[] => {
      setEdges(newEdges)
      if (!isLoaded) setIsLoaded(true)
      return marshalEdges(newEdges)
    },
    [isLoaded, setEdges, setIsLoaded],
  )

  return [nodes, update, edges, isLoaded]
}
