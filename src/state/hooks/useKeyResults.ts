import flow from 'lodash/flow'
import { Loadable, SetterOrUpdater, useRecoilState, useRecoilValueLoadable } from 'recoil'

import { KeyResultsHashmap } from 'components/KeyResult'
import { CustomSorting, User } from 'components/User'
import logger from 'lib/logger'
import { hasFetchedAllValues } from 'specifications'
import { patchFromAPI } from 'state/actions'
import userCustomSortingAtom from 'state/atoms/user/customSorting/keyResults'
import userIDAtom from 'state/atoms/user/id'
import { all as allSelector } from 'state/selectors/keyResults'
import userCustomSortingSelector from 'state/selectors/user/customSorting/keyResults'

const KEY = 'useKeyResults'

type KeyResultsHook = {
  all: Loadable<KeyResultsHashmap>
  customSorting: Loadable<CustomSorting['keyResults']>
  reorderCustomSort: (
    fromIndex: number,
    toIndex: number,
  ) => CustomSorting['keyResults'] | false | void
}

interface ReorderCustomSortState {
  userID: User['id']
  fromIndex: number
  toIndex: number
  originalCustomSorting: CustomSorting['keyResults']
  newCustomSorting: CustomSorting['keyResults']
  setLocalUserCustomSorting: SetterOrUpdater<CustomSorting['keyResults']>
  remoteResponse: CustomSorting['keyResults']
}

const changeSortOrder = (state: ReorderCustomSortState): ReorderCustomSortState => {
  logger.debug('Reordering user custom sort. Original sort order:', {
    data: state.originalCustomSorting,
    component: KEY,
  })

  const newCustomSorting = Array.from(state.originalCustomSorting)
  const [movedID] = newCustomSorting.splice(state.fromIndex, 1)
  newCustomSorting.splice(state.toIndex, 0, movedID)

  logger.debug('Finished defining new order. Dispatching the following order to our API:', {
    data: newCustomSorting,
    component: KEY,
  })

  return {
    ...state,
    newCustomSorting,
  }
}

const updateCustomSortLocalState = (state: ReorderCustomSortState): ReorderCustomSortState => {
  logger.debug(
    `Updating local state with the following new custom sort for user ${state.userID}:`,
    {
      data: state.newCustomSorting,
      component: KEY,
    },
  )

  state.setLocalUserCustomSorting(state.newCustomSorting)

  return state
}

const updateCustomSortRemoteState = async (
  state: ReorderCustomSortState,
): Promise<ReorderCustomSortState> => {
  const body = {
    keyResults: state.newCustomSorting,
  }

  logger.debug(`Dispatching the following new custom sort for user ${state.userID}:`, {
    data: body,
    component: KEY,
  })
  const response = await patchFromAPI<CustomSorting['keyResults']>(
    `/users/${state.userID}/custom-sorting`,
    body,
    KEY,
  )

  return {
    ...state,
    remoteResponse: response,
  }
}

const useKeyResults = (): KeyResultsHook => {
  const userID = useRecoilValueLoadable(userIDAtom)
  const setLocalUserCustomSorting = useRecoilState(userCustomSortingAtom)[1]
  const allKeyResults = useRecoilValueLoadable<KeyResultsHashmap>(allSelector)
  const userCustomSorting = useRecoilValueLoadable<CustomSorting['keyResults']>(
    userCustomSortingSelector,
  )

  const reorderCustomSort = (fromIndex: number, toIndex: number): Promise<ReorderCustomSortState> =>
    hasFetchedAllValues(userCustomSorting, userID) &&
    flow(
      changeSortOrder,
      updateCustomSortLocalState,
      updateCustomSortRemoteState,
    )({
      fromIndex,
      toIndex,
      setLocalUserCustomSorting,
      userID: userID.contents,
      originalCustomSorting: userCustomSorting.contents,
    })

  return {
    reorderCustomSort,
    all: allKeyResults,
    customSorting: userCustomSorting,
  }
}

export default useKeyResults
