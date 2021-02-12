import { AUTHZ_POLICY } from './constants'
import { AuthzPolicies } from './types'

const defaultPolicies: AuthzPolicies = {
  create: AUTHZ_POLICY.DENY,
  read: AUTHZ_POLICY.DENY,
  update: AUTHZ_POLICY.DENY,
  delete: AUTHZ_POLICY.DENY,
}

export default defaultPolicies
