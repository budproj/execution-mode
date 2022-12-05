import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { KeyResult } from 'src/components/KeyResult/types'
import { Team } from 'src/components/Team/types'
import { GraphQLEdge } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { CARD_TYPES } from '../../utils/card-types'

import GET_TEAM_KEY_RESULTS_OUTDATED from './key-results-outdated.gql'
import GET_TEAM_KEY_RESULTS_BARRIER from './key-results-with-barrier.gql'
import GET_TEAM_KEY_RESULTS_LOW_CONFIDENCE from './key-results-with-low-confidence.gql'

type teamFlags = 'outdated' | 'barrier' | 'low' | 'noRelated'

type getTeamKeyResultsBarrier = {
  getTeamFlagsData: Record<
    teamFlags,
    {
      edges: Array<GraphQLEdge<KeyResult>>
    }
  >
}

interface GetTeamKeyResultsBarrier {
  data: KeyResult[]
  setKeyResultHighlightType: (type: CARD_TYPES) => void
  setTeamId: (teamId: Team['id']) => void
  loading: boolean
  called: boolean
}

export const useGetTeamKeyResultsHighlights = (): GetTeamKeyResultsBarrier => {
  const [loadKRs] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()
  const [teamId, setTeamId] = useState<Team['id']>()
  const [keyResultHighlightType, setKeyResultHighlightType] = useState<CARD_TYPES>(
    CARD_TYPES.BARRIER,
  )

  const queryVariables = {}

  if (teamId) {
    Object.assign(queryVariables, { teamId })
  }

  const highlightTypesMap = new Map([
    [CARD_TYPES.BARRIER, GET_TEAM_KEY_RESULTS_BARRIER],
    [CARD_TYPES.CHECKIN, GET_TEAM_KEY_RESULTS_OUTDATED],
    [CARD_TYPES.CONFIDENCE, GET_TEAM_KEY_RESULTS_LOW_CONFIDENCE],
  ])

  const query = highlightTypesMap.get(keyResultHighlightType)

  const { loading, called } = useQuery<getTeamKeyResultsBarrier>(query, {
    variables: queryVariables,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const mappedEdge = getEdgesByCardType(keyResultHighlightType)

      const keyResultsEdges = data.getTeamFlagsData[`${mappedEdge}`].edges

      if (keyResultsEdges.length > 0) setKeyResults(keyResultsEdges)
    },
  })

  useEffect(() => {
    loadKRs(keyResults)
  }, [keyResults, loadKRs])

  return { data: keyResults, setKeyResultHighlightType, loading, called, setTeamId }
}

const getEdgesByCardType = (type: CARD_TYPES) => {
  if (type === CARD_TYPES.BARRIER) return 'barrier'
  if (type === CARD_TYPES.CHECKIN) return 'outdated'
  return 'low'
}
