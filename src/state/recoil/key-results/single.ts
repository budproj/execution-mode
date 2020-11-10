import { KeyResult } from 'components/KeyResult'
import { selectorFamily } from 'recoil'
import { allKeyResults as allKeyResultsAtom } from './all'
import { PREFIX } from './constants'

export const KEY = `${PREFIX}::SINGLE`

export const selectKeyResultByID = selectorFamily<KeyResult, KeyResult['id']>({
  key: `${KEY}::BY_ID`,
  get: (id) => ({ get }) => {
    const allKeyResults = get(allKeyResultsAtom)
    const selectedKeyResult = allKeyResults[id]

    return selectedKeyResult
  },
  set: (id) => ({ get, set }, updatedPartialKeyResult) => {
    const selectedKeyResult = get(selectKeyResultByID(id))

    console.log('tag', selectedKeyResult)
    console.log('tag', updatedPartialKeyResult)
  },
})
