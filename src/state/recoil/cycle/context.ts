import { atomFamily, DefaultValue, selectorFamily } from 'recoil'

import { PREFIX } from './constants'

export enum CycleModalViewMode {
  CLOSED = 'closed',
  CREATE = 'create',
  EDIT = 'edit',
}

type CycleContext = {
  mode: CycleModalViewMode
}

export const cycleContext = atomFamily<CycleContext, string | undefined>({
  key: `${PREFIX}::CONTEXT`,
  default: {
    mode: CycleModalViewMode.CLOSED,
  },
})

export const setCycleModalViewToMode = selectorFamily<string | undefined, CycleModalViewMode>({
  key: `${PREFIX}::SET_CYLE_MODAL_TO_MODE`,
  // eslint-disable-next-line unicorn/consistent-function-scoping, unicorn/no-useless-undefined
  get: (_) => (__) => undefined,
  set:
    (mode) =>
    ({ get, set }, cycleID) => {
      if (cycleID instanceof DefaultValue) return

      const contextAtom = cycleContext(cycleID)

      const oldContext = get(contextAtom)
      const newContext: CycleContext = {
        ...oldContext,
        mode,
      }

      set(contextAtom, newContext)
    },
})
