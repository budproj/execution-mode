import { KeyResult } from 'components/KeyResult'
import logger from 'lib/logger'
import { flow } from 'lodash'
import { SetterOrUpdater } from 'recoil'
import { patchFromAPI } from '../api'

const component = 'updateKeyResults'

export interface UpdateKeyResultState {
  id: KeyResult['id']
  localStateSetter: SetterOrUpdater<Partial<KeyResult> | undefined>
  newKeyResult: Partial<KeyResult>
  remoteStateResult?: KeyResult
}

const updateLocalState = (state: UpdateKeyResultState): UpdateKeyResultState => {
  state.localStateSetter(state.newKeyResult)
  logger.debug('Local Key Result state updated with success')

  return state
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

const updateKeyResult = async (
  keyResultID: KeyResult['id'],
  newKeyResult: Partial<KeyResult>,
  keyResultSetter: SetterOrUpdater<Partial<KeyResult> | undefined>,
): Promise<KeyResult | undefined> => {
  const run = flow(updateLocalState, updateRemoteState, extractRemoteResult)

  const state: UpdateKeyResultState = {
    newKeyResult,
    id: keyResultID,
    localStateSetter: keyResultSetter,
  }

  logger.debug(
    `Running Key Result update action for Key Result with id ${keyResultID}, with updated data:`,
    { component, data: newKeyResult },
  )
  return run(state)
}

export default updateKeyResult
