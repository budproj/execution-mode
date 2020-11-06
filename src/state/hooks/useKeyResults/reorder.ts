import flow from 'lodash/flow'
import { SetterOrUpdater } from 'recoil'

import { CustomSorting, User } from 'components/User'
import logger from 'lib/logger'
import { patchFromAPI } from 'state/actions'

const KEY = 'useKeyResults::reorder'

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

const reorder = (
  userID: User['id'],
  userCustomSorting: CustomSorting['keyResults'],
  setLocalUserCustomSorting: SetterOrUpdater<CustomSorting['keyResults']>,
) => (fromIndex: number, toIndex: number): Promise<ReorderCustomSortState> =>
  flow(
    changeSortOrder,
    updateCustomSortLocalState,
    updateCustomSortRemoteState,
  )({
    fromIndex,
    toIndex,
    setLocalUserCustomSorting,
    userID: userID,
    originalCustomSorting: userCustomSorting,
  })

export default reorder
