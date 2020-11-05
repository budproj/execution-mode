import { Loadable, useRecoilValueLoadable } from 'recoil'

import { KeyResultsHashmap } from 'components/KeyResult'
import { all as allSelector } from 'state/selectors/keyResults'

type KeyResultsHook = {
  all: Loadable<KeyResultsHashmap>
}

const useKeyResults = (): KeyResultsHook => {
  const allKeyResults = useRecoilValueLoadable(allSelector)

  return {
    all: allKeyResults,
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
