import clone from 'lodash/clone'
import getPath from 'lodash/get'
import setWith from 'lodash/setWith'
import snakeCase from 'lodash/snakeCase'
import { DefaultValue, selectorFamily } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'
import userAtomFamily from 'src/state/recoil/user/atom-family'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::PARTIAL_SELECTOR`

type ValueOf<T> = T[keyof T]
type UserPart = ValueOf<User> | ValueOf<Objective> | ValueOf<Team>

export const getUserPart =
  <T extends UserPart>(part: string) =>
  (id?: User['id']) =>
  ({ get }: RecoilInterfaceGetter) => {
    if (!id) return

    const user = get(userAtomFamily(id))
    const userPart = getPath(user, part) as T

    return userPart
  }

export const setUserPart =
  <T>(part: string, defaultValue?: any) =>
  (id?: User['id']) =>
  ({ get, set, reset }: RecoilInterfaceReadWrite, newValue: T | DefaultValue | undefined) => {
    if (!id) return
    if (newValue instanceof DefaultValue)
      return resetUserPart(part)(id)({ get, set, reset }, defaultValue)

    const originalUser = clone(get(userAtomFamily(id))) as User
    const newUser = setWith(originalUser, part, newValue, clone)

    set(userAtomFamily(id), newUser)
  }

const resetUserPart =
  (part: string) =>
  (id?: User['id']) =>
  ({ get, set }: RecoilInterfaceReadWrite, defaultValue?: any) => {
    const originalUser = clone(get(userAtomFamily(id))) as User
    const newUser = setWith(originalUser, part, defaultValue, clone)

    set(userAtomFamily(id), newUser)
  }

export const buildPartialSelector = <T extends UserPart>(part: string) =>
  selectorFamily<T | undefined, User['id'] | undefined>({
    key: `${KEY}::USER_${snakeCase(part).toUpperCase()}`,
    get: getUserPart<T>(part),
    set: setUserPart<T>(part),
  })

export default buildPartialSelector
