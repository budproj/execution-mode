import { AUTHZ_POLICY } from './constants'

export interface AuthzPolicies {
  create: AUTHZ_POLICY
  read: AUTHZ_POLICY
  update: AUTHZ_POLICY
  delete: AUTHZ_POLICY
}
