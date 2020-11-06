import { Loadable, useRecoilState, useRecoilValueLoadable } from 'recoil'

import buildReorder from './reorder'

import { KeyResultsHashmap } from 'components/KeyResult'
import { CustomSorting } from 'components/User'
import { hasFetchedAllValues } from 'specifications'
import userCustomSortingAtom from 'state/atoms/user/customSorting/keyResults'
import userIDAtom from 'state/atoms/user/id'
import { all as allSelector } from 'state/selectors/keyResults'
import userCustomSortingSelector from 'state/selectors/user/customSorting/keyResults'

type KeyResultsHook = {
  all: Loadable<KeyResultsHashmap>
  customSorting: Loadable<CustomSorting['keyResults']>
  reorder: (fromIndex: number, toIndex: number) => CustomSorting['keyResults'] | false | void
}

const useKeyResults = (): KeyResultsHook => {
  const userID = useRecoilValueLoadable(userIDAtom)
  const setLocalUserCustomSorting = useRecoilState(userCustomSortingAtom)[1]
  const allKeyResults = useRecoilValueLoadable<KeyResultsHashmap>(allSelector)
  const userCustomSorting = useRecoilValueLoadable<CustomSorting['keyResults']>(
    userCustomSortingSelector,
  )

  const reorder =
    hasFetchedAllValues(userID, userCustomSorting) &&
    buildReorder(userID.contents, userCustomSorting.contents, setLocalUserCustomSorting)

  return {
    reorder,
    all: allKeyResults,
    customSorting: userCustomSorting,
  }
}

export default useKeyResults
