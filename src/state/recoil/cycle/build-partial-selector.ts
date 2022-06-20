import clone from 'lodash/clone'
import getPath from 'lodash/get'
import setWith from 'lodash/setWith'
import snakeCase from 'lodash/snakeCase'
import { DefaultValue, selectorFamily } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import cycleAtomFamily from 'src/state/recoil/cycle/atom-family'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::PARTIAL_SELECTOR`

type ValueOf<T> = T[keyof T]
type CyclePart = ValueOf<Cycle> | ValueOf<Objective> | ValueOf<User> | ValueOf<Team>

export const getCyclePart =
  <T extends CyclePart>(part: string) =>
  (id?: Cycle['id']) =>
  ({ get }: RecoilInterfaceGetter) => {
    if (!id) return

    const cycle = get(cycleAtomFamily(id))
    const cyclePart = getPath(cycle, part) as T

    return cyclePart
  }

export const setCyclePart =
  <T>(part: string, defaultValue?: any) =>
  (id?: Cycle['id']) =>
  ({ get, set, reset }: RecoilInterfaceReadWrite, newValue: T | DefaultValue | undefined) => {
    if (!id) return
    if (newValue instanceof DefaultValue)
      return resetCyclePart(part)(id)({ get, set, reset }, defaultValue)

    const originalCycle = clone(get(cycleAtomFamily(id))) as Cycle
    const newCycle = setWith(originalCycle, part, newValue, clone)

    set(cycleAtomFamily(id), newCycle)
  }

const resetCyclePart =
  (part: string) =>
  (id?: Cycle['id']) =>
  ({ get, set }: RecoilInterfaceReadWrite, defaultValue?: any) => {
    const originalCycle = clone(get(cycleAtomFamily(id))) as Cycle
    const newCycle = setWith(originalCycle, part, defaultValue, clone)

    set(cycleAtomFamily(id), newCycle)
  }

export const buildPartialSelector = <T extends CyclePart>(part: string) =>
  selectorFamily<T | undefined, Cycle['id'] | undefined>({
    key: `${KEY}::CYCLE_${snakeCase(part).toUpperCase()}`,
    get: getCyclePart<T>(part),
    set: setCyclePart<T>(part),
  })

export default buildPartialSelector
