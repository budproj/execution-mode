import { flow } from 'lodash'
import { SetterOrUpdater } from 'recoil'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult'

import { patchFromAPI } from '../api'

const component = 'updateRemoteKeyResults'

export interface UpdateKeyResultState {
  id: KeyResult['id']
  localStateSetter: SetterOrUpdater<Partial<KeyResult> | undefined>
  newKeyResult: Partial<KeyResult>
  remoteStateResult?: KeyResult
}

const updateRemoteState = async (state: UpdateKeyResultState): Promise<UpdateKeyResultState> => {
  logger.debug('Dispatching Key Result remote update with data:', {
    data: state.newKeyResult,
    component,
  })
  const response = await patchFromAPI<KeyResult>(
    `/key-results/${state.id}`,
    state.newKeyResult,
    component,
  )

  return {
    ...state,
    remoteStateResult: response,
  }
}

const extractRemoteResult = async (
  statePromise: Promise<UpdateKeyResultState>,
): Promise<KeyResult | undefined> => {
  const state = await statePromise

  return state.remoteStateResult
}

const updateRemoteKeyResult = async (
  keyResultID: KeyResult['id'],
  newKeyResult: Partial<KeyResult>,
): Promise<KeyResult | undefined> => {
  const run = flow(updateRemoteState, extractRemoteResult)

  const state: UpdateKeyResultState = {
    newKeyResult,
    id: keyResultID,
  }

  logger.debug(
    `Running Key Result update action for Key Result with id ${keyResultID}, with updated data:`,
    { component, data: newKeyResult },
  )
  return run(state)
}

export default updateRemoteKeyResult
