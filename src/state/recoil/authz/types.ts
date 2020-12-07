import { ACTION, AUTHZ_API, AUTHZ_ROLE, RESOURCE, SCOPE, SCOPED_PERMISSION } from './constants'

export interface AuthzRolesGroup {
  api: AUTHZ_ROLE[]
}

export interface AuthzUser {
  email: string
  email_verified: boolean
  [AUTHZ_API.ROLES]: AUTHZ_ROLE[]
  [AUTHZ_API.PERMISSIONS]: SCOPED_PERMISSION[]
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: Date
}

export type AuthzPermissions = Record<RESOURCE, AuthzScopeGroup>

export type AuthzScopeGroup = Record<ACTION, SCOPE>
