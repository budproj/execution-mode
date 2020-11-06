import { Loadable, useRecoilValueLoadable } from 'recoil'

import { KeyResultsHashmap } from 'components/KeyResult'
import { CustomSorting } from 'components/User'
import { all as allSelector } from 'state/selectors/keyResults'
import userCustomSortingSelector from 'state/selectors/user/customSorting/keyResult'

type KeyResultsHook = {
  all: Loadable<KeyResultsHashmap>
  customSorting: Loadable<CustomSorting>
}

const useKeyResults = (): KeyResultsHook => {
  const allKeyResults = useRecoilValueLoadable(allSelector)
  const userCustomSorting = useRecoilValueLoadable(userCustomSortingSelector)

  return {
    all: allKeyResults,
    customSorting: userCustomSorting,
  }

  // return {
  //   all: response,
  //   reorderSingle: (fromIndex: number, toIndex: number): KeyResult[] => {
  //     const reorderedKeyResults = Array.from(response)
  //     const [movedKeyResult] = reorderedKeyResults.splice(fromIndex, 1)
  //     reorderedKeyResults.splice(toIndex, 0, movedKeyResult)

  //     setResponse(reorderedKeyResults)

  //     return reorderedKeyResults
  //   },
  // }
}

export default useKeyResults
