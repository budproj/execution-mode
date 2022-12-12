import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import { CARD_TYPES } from '../../utils/card-types'

import GET_KEY_RESULTS_HIGHLIGHTS from './get-key-results-highlights.gql'

interface KeyResultsHighlights {
  getTeamFlags: {
    outdatedLength: number
    lowLength: number
    noRelatedLength: number
    barrierLength: number
  }
  loading: boolean
  called: boolean
}

type HightlightCard = {
  type: CARD_TYPES
  title: string
  quantity: number
}

interface GetKeyResultsHighlights {
  data: HightlightCard[]
  loading: boolean
  called: boolean
}

export const useGetKeyResultsHighlights = (): GetKeyResultsHighlights => {
  const [teamHighlights, setTeamHighlights] = useState<HightlightCard[]>([])
  const teamId = useRecoilValue(selectedTeamIdHighlight)

  const query = {
    teamId,
  }

  const { loading, called } = useQuery<KeyResultsHighlights>(GET_KEY_RESULTS_HIGHLIGHTS, {
    variables: query,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const dataParsed = parsedData(data.getTeamFlags)

      if (dataParsed.length > 0) setTeamHighlights(dataParsed)
    },
  })

  return { data: teamHighlights, loading, called }
}

const parsedData = (data: KeyResultsHighlights['getTeamFlags']) => {
  const parsedHightlight: HightlightCard[] = []

  for (const item of Object.keys(data)) {
    if (item === 'outdatedLength') {
      parsedHightlight.push({
        type: CARD_TYPES.CHECKIN,
        title: 'Check-in atrasado',
        quantity: data.outdatedLength,
      })
    }

    if (item === 'lowLength') {
      parsedHightlight.push({
        type: CARD_TYPES.CONFIDENCE,
        title: 'Baixa confiança',
        quantity: data.lowLength,
      })
    }

    if (item === 'noRelatedLength') {
      parsedHightlight.push({
        type: CARD_TYPES.KRMEMBERS,
        title: 'Membros sem KRS',
        quantity: data.noRelatedLength,
      })
    }

    if (item === 'barrierLength') {
      parsedHightlight.push({
        type: CARD_TYPES.BARRIER,
        title: 'Barreira',
        quantity: data.barrierLength,
      })
    }
  }

  return parsedHightlight
}
