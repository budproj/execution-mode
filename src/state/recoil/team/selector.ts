import deepmerge from 'deepmerge'
import { DefaultValue, selectorFamily } from 'recoil'

import { overwriteMerge } from 'lib/deepmerge'
import { Team } from 'src/components/Team/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import { teamAtomFamily } from '.'

const KEY = `${PREFIX}::SELECTOR`

export const updateTeam =
  (id?: string) =>
  ({ get, set }: RecoilInterfaceReadWrite, newData: Partial<Team> | DefaultValue | undefined) => {
    if (!id) return
    if (!newData) return

    const atom = teamAtomFamily(id)
    const currentValue = get(atom) ?? {}
    const newValue = deepmerge(currentValue, newData as Partial<Team>, {
      arrayMerge: overwriteMerge,
    })

    set(atom, newValue)
  }

export const selectTeam = selectorFamily<Partial<Team> | undefined, string | undefined>({
  key: KEY,
  get:
    (id) =>
    ({ get }) =>
      get(teamAtomFamily(id)),
  set: updateTeam,
})
