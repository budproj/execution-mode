import { User } from '@auth0/auth0-react'

import { AUTHZ_ROLES, AUTHZ_TENANT_ROLE } from './constants'

export interface AuthzRolesGroup {
  api: AUTHZ_ROLES[]
}

export interface AuthzUser extends User {
  [AUTHZ_TENANT_ROLE.PRODUCTION]?: AUTHZ_ROLES[]
  [AUTHZ_TENANT_ROLE.DEVELOP]?: AUTHZ_ROLES[]
}
