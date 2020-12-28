import { AUTHZ_ROLES, AUTHZ_TENANT_ROLE } from './constants'

export interface AuthzRolesGroup {
  api: AUTHZ_ROLES[]
}

export interface AuthzUser {
  email: string
  email_verified: boolean
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: Date
  [AUTHZ_TENANT_ROLE.PRODUCTION]?: AUTHZ_ROLES[]
  [AUTHZ_TENANT_ROLE.DEVELOP]?: AUTHZ_ROLES[]
}
