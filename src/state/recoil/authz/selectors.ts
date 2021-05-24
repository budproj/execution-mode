import { selector } from 'recoil'

import getConfig from 'src/config'
import { RecoilInterfaceGetter } from 'src/state/recoil/types'

import authzAtom from './atom'
import { PREFIX, AUTHZ_TENANT_ROLE, UPPERCASED_ENVIRONMENT } from './constants'
import { AuthzRolesGroup } from './types'

const KEY = `${PREFIX}::SELECTORS`

export const getRoles = ({ get }: RecoilInterfaceGetter) => {
  const { publicRuntimeConfig } = getConfig()
  const uppercasedEnvironment =
    publicRuntimeConfig.environment.toUpperCase() as UPPERCASED_ENVIRONMENT
  const authzTenant = AUTHZ_TENANT_ROLE[uppercasedEnvironment]

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
