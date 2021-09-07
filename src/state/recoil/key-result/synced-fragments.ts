import { atomFamily, DefaultValue, selectorFamily } from 'recoil'

import { PREFIX } from './constants'

type SyncedFragments = {
  progressHistory: boolean
}

export const syncedFragments = atomFamily<SyncedFragments, string | undefined>({
  key: `${PREFIX}::SYNCED_FRAGMENTS`,
  default: {
    progressHistory: false,
  },
})

export const selectSyncedFragment = (fragment: keyof SyncedFragments) =>
  selectorFamily<boolean, string | undefined>({
    key: `${PREFIX}::SELECT_SYNCED_FRAGMENT`,
    get:
      (id) =>
      ({ get }) =>
        get(syncedFragments(id))[fragment],
    set:
      (id) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return

        const previousState = get(syncedFragments(id))
        set(syncedFragments(id), {
          ...previousState,
          [fragment]: newValue,
        })
      },
  })
