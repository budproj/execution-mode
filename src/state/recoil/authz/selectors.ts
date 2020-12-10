import { selector } from 'recoil'

import { RecoilSpecificationGetter } from 'src/state/recoil/types'

import authzAtom from './atom'
import { PREFIX } from './constants'
import { AuthzRolesGroup } from './types'

const KEY = `${PREFIX}::SELECTORS`

export const getRoles = ({ get }: RecoilSpecificationGetter) => {
  const user = get(authzAtom)
  const api = user?.['https://api.getbud.co/roles'] ?? []

  return {
    api,
  }
}

export const selectRoles = selector<AuthzRolesGroup>({
  key: `${KEY}::ROLES`,
  get: getRoles,
})
