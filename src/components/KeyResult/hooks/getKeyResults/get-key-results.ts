import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResult } from '../../types'

import GET_KEY_RESULTS from './get-key-results.gql'

interface GetCompanyCycles {
  data: KeyResult[]
  loading: boolean
  called: boolean
}

export const useGetKeyResults = (): GetCompanyCycles => {
  const [loadKRs] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()

  const { loading, called } = useQuery<GetUserPrimaryCompanyQuery>(GET_KEY_RESULTS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setKeyResults(data.me?.keyResults?.edges ?? [])
    },
  })

  useEffect(() => {
    loadKRs(keyResults)
  }, [keyResults, loadKRs])

  return { data: keyResults, loading, called }
}
