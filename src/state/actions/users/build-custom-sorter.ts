import flow from 'lodash/flow'
import { Loadable, SetterOrUpdater } from 'recoil'

import { CustomSorting, User } from 'components/User'
import logger from 'lib/logger'
import { patchFromAPI } from 'state/actions/api'

const component = 'buildCustomSorter'

export interface ReorderCustomSortState {
  userID: User['id']
  fromIndex: number
  toIndex: number
  originalCustomSorting: CustomSorting['keyResults']
  setLocalUserCustomSorting: SetterOrUpdater<CustomSorting['keyResults']>
  remoteResponse?: CustomSorting['keyResults']
  newCustomSorting?: CustomSorting['keyResults']
}

const changeSortOrder = (state: ReorderCustomSortState): ReorderCustomSortState => {
  logger.debug('Reordering user custom sort. Original sort order:', {
    data: state.originalCustomSorting,
    component,
  })

  const newCustomSorting = [...state.originalCustomSorting]
  const [movedID] = newCustomSorting.splice(state.fromIndex, 1)
  newCustomSorting.splice(state.toIndex, 0, movedID)

  logger.debug('Finished defining new order. Dispatching the following order to our API:', {
    data: newCustomSorting,
    component,
  })

  return {
    ...state,
    newCustomSorting,
  }
}

const updateCustomSortLocalState = (state: ReorderCustomSortState): ReorderCustomSortState => {
  if (!state.newCustomSorting) {
    return state
  }

  logger.debug(
    `Updating local state with the following new custom sort for user ${state.userID}:`,
    {
      data: state.newCustomSorting,
      component,
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
    component,
  })
  const response = await patchFromAPI<CustomSorting['keyResults']>(
    `/users/${state.userID}/custom-sorting`,
    body,
    component,
  )

  return {
    ...state,
    remoteResponse: response,
  }
}

const extractNewCustomSorting = async (
  promise: Promise<ReorderCustomSortState>,
): Promise<CustomSorting['keyResults'] | undefined> => {
  const state = await promise

  return state.newCustomSorting
}

const buildCustomSorter = (
  userID: Loadable<User['id']>,
  userCustomSorting: Loadable<CustomSorting['keyResults']>,
  setLocalUserCustomSorting: SetterOrUpdater<CustomSorting['keyResults']>,
) => async (fromIndex: number, toIndex: number): Promise<CustomSorting['keyResults']> => {
  const executeReorder = flow(
    changeSortOrder,
    updateCustomSortLocalState,
    updateCustomSortRemoteState,
    extractNewCustomSorting,
  )
  const state: ReorderCustomSortState = {
    fromIndex,
    toIndex,
    setLocalUserCustomSorting,
    userID: userID.getValue(),
    originalCustomSorting: userCustomSorting.getValue(),
  }

  return flow(executeReorder)(state)
}

export default buildCustomSorter
