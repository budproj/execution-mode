import deepmerge from 'deepmerge'
import { DefaultValue, selectorFamily } from 'recoil'

import { overwriteMerge } from 'lib/deepmerge'
import { User } from 'src/components/User/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import userAtomFamily from './atom-family'

const KEY = `${PREFIX}::SELECTOR`

export const updateUser = (id?: User['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  newUser: Partial<User> | DefaultValue | undefined,
) => {
  if (!id) return
  if (!newUser) return

  const atom = userAtomFamily(id)
  const currentValue = get(atom) ?? {}
  const newValue = deepmerge(currentValue, newUser as Partial<User>, {
    arrayMerge: overwriteMerge,
  })

  set(atom, newValue)
}

export const selectUser = selectorFamily<Partial<User> | undefined, User['id'] | undefined>({
  key: KEY,
  get: (id) => ({ get }) => get(userAtomFamily(id)),
  set: updateUser,
})

export default selectUser
