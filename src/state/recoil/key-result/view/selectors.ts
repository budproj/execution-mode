import getPath from 'lodash/get'
import { selectorFamily, ReadWriteSelectorFamilyOptions } from 'recoil'

import { KeyResult } from 'components/KeyResult'

import { PREFIX } from './constants'
import keyResultAtomFamily from './key-result-atom-family'

const KEY = `${PREFIX}::SELECTORS`

type ValueOf<T> = T[keyof T]

const selectKeyResultPart = (
  part: keyof KeyResult,
): ReadWriteSelectorFamilyOptions<ValueOf<KeyResult> | undefined, KeyResult['id'] | undefined> => ({
  key: `${KEY}::KEY_RESULT_${part.toUpperCase()}`,
  get: (id) => ({ get }) => {
    if (!id) return

    const keyResult = get(keyResultAtomFamily(id))
    const keyResultPart = getPath(keyResult, part)

    return keyResultPart
  },
  set: (id) => ({ get, set }, newValue) => {
    const originalKeyResult = get(keyResultAtomFamily(id as KeyResult['id'])) as KeyResult
    const newPartialValue = { [part]: newValue }
    const newKeyResult: KeyResult = {
      ...originalKeyResult,
      ...newPartialValue,
    }

    set(keyResultAtomFamily(id as KeyResult['id']), newKeyResult)
  },
})

export const selectKeyResultTitle = selectorFamily<
  KeyResult['title'] | undefined,
  KeyResult['id'] | undefined
>(selectKeyResultPart('title'))

export const selectKeyResultTeam = selectorFamily<
  KeyResult['team'] | undefined,
  KeyResult['id'] | undefined
>(selectKeyResultPart('team'))

export const selectKeyResultObjective = selectorFamily<
  KeyResult['objective'] | undefined,
  KeyResult['id'] | undefined
>(selectKeyResultPart('objective'))

export const selectKeyResultConfidenceReports = selectorFamily<
  KeyResult['confidenceReports'] | undefined,
  KeyResult['id'] | undefined
>(selectKeyResultPart('confidenceReports'))

export const selectKeyResultProgressReports = selectorFamily<
  KeyResult['progressReports'] | undefined,
  KeyResult['id'] | undefined
>(selectKeyResultPart('progressReports'))

export const selectKeyResultCycle = selectorFamily<
  KeyResult['objective']['cycle'] | undefined,
  KeyResult['id'] | undefined
>(selectKeyResultPart('objective.cycle'))

export const selectKeyResultOwner = selectorFamily<
  KeyResult['owner'] | undefined,
  KeyResult['id'] | undefined
>(selectKeyResultPart('owner'))
