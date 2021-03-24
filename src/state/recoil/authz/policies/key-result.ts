import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'
import defaultPolicies from './default-policies'
import { AuthzPolicies } from './types'

export interface AuthzPoliciesKeyResult {
  root: AuthzPolicies
  childEntities: AuthzPoliciesKeyResulChildEntities
}

export interface AuthzPoliciesKeyResulChildEntities {
  keyResultCheckIn: AuthzPolicies
  keyResultComment: AuthzPolicies
}

export const defaultKeyResultPolicies = {
  root: defaultPolicies,
  childEntities: {
    keyResultCheckIn: defaultPolicies,
    keyResultComment: defaultPolicies,
  },
}

const KEY = `${PREFIX}::KEY_RESULT`

const authzPoliciesKeyResult = atomFamily<AuthzPoliciesKeyResult, KeyResult['id'] | undefined>({
  key: KEY,
  default: defaultKeyResultPolicies,
})

export default authzPoliciesKeyResult
