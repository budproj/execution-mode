import { ApolloQueryResult, OperationVariables, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultChecklistAtom } from 'src/state/recoil/key-result/checklist'
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
  const setKeyResultChecklist = useSetRecoilState(keyResultChecklistAtom(id))

  const handleQueryData = (data: GetKeyResultWithIDQuery) => {
    setKeyResult(data.keyResult)
    setKeyResultChecklist(data.keyResult.checkList)
  }

  const [getKeyResultWithId, { loading, called, data, refetch }] =
    useLazyQuery<GetKeyResultWithIDQuery>(queries.GET_KEY_RESULT_AND_RELATIONS, {
      variables: {
        id,
      },
      onCompleted: handleQueryData,
      fetchPolicy: 'cache-and-network',
    })

  useEffect(() => {
    if (id) {
      getKeyResultWithId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return { loading, called, data, refetch }
}

export default useGetKeyResultWithId
