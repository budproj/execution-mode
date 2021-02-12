import { Factory } from 'miragejs'

import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'

export default Factory.extend({
  create: AUTHZ_POLICY.ALLOW,
  update: AUTHZ_POLICY.ALLOW,
  read: AUTHZ_POLICY.ALLOW,
  delete: AUTHZ_POLICY.ALLOW,
})
