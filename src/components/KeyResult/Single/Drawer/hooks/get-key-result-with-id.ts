import { ApolloQueryResult, OperationVariables, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import selectKeyResult from 'src/state/recoil/key-result/key-result'

import { GetKeyResultWithIDQuery } from '../content'
import queries from '../queries.gql'

interface UseGetKeyResultWithIdProperties {
  loading?: boolean
  called?: boolean
  data?: GetKeyResultWithIDQuery
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<GetKeyResultWithIDQuery>>
}

const useGetKeyResultWithId = (id?: KeyResult['id']): UseGetKeyResultWithIdProperties => {
  const setKeyResult = useSetRecoilState(selectKeyResult(id))

  const handleQueryData = (data: GetKeyResultWithIDQuery) => {
    setKeyResult(data.keyResult)
  }

  const [getKeyResultWithId, { loading, called, data, refetch }] =
    useLazyQuery<GetKeyResultWithIDQuery>(queries.GET_KEY_RESULT_WITH_ID, {
      variables: {
        id,
      },
      onCompleted: handleQueryData,
      fetchPolicy: 'network-only',
    })

  useEffect(() => {
    if (id) getKeyResultWithId()
  }, [getKeyResultWithId, id])

  return { loading, called, data, refetch }
}

export default useGetKeyResultWithId
