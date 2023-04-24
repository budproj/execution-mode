import { atomFamily, DefaultValue, selectorFamily } from 'recoil'

import { PREFIX } from './constants'

export enum ObjectiveMode {
  COLLAPSED = 'collapsed',
  VIEW = 'view',
  EDIT = 'edit',
  FILLED = 'FILLED',
  PUBLISHED = 'PUBLISHED',
}

type ObjectiveContext = {
  mode: ObjectiveMode
}

export const objectiveContext = atomFamily<ObjectiveContext, string | undefined>({
  key: `${PREFIX}::CONTEXT`,
  default: {
    mode: ObjectiveMode.COLLAPSED,
  },
})

export const setObjectiveToMode = selectorFamily<string | undefined, ObjectiveMode>({
  key: `${PREFIX}::SET_OBJECTIVE_TO_MODE`,
  // eslint-disable-next-line unicorn/consistent-function-scoping, unicorn/no-useless-undefined
  get: (_) => (__) => undefined,
  set:
    (mode) =>
    ({ get, set }, objectiveID) => {
      if (objectiveID instanceof DefaultValue) return

      const contextAtom = objectiveContext(objectiveID)

      const oldContext = get(contextAtom)
      const newContext: ObjectiveContext = {
        ...oldContext,
        mode,
      }

      set(contextAtom, newContext)
    },
})
