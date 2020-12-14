import { selector } from 'recoil'

import getConfig from 'src/config'
import { RecoilSpecificationGetter } from 'src/state/recoil/types'

import authzAtom from './atom'
import { PREFIX } from './constants'
import { AuthzRolesGroup, AuthzTenantRole, UppercasedEnvironment } from './types'

const KEY = `${PREFIX}::SELECTORS`

export const getRoles = ({ get }: RecoilSpecificationGetter) => {
  const { publicRuntimeConfig } = getConfig()
  const uppercasedEnvironment = publicRuntimeConfig.environment.toUpperCase() as UppercasedEnvironment
  const authzTenant = AuthzTenantRole[uppercasedEnvironment]

  const user = get(authzAtom)
  const api = user?.[authzTenant] ?? []

  return {
    api,
  }
}

export const selectRoles = selector<AuthzRolesGroup>({
  key: `${KEY}::ROLES`,
  get: getRoles,
})
