import { PREFIX as PARENT_PREFIX } from '../constants'

export const PREFIX = `${PARENT_PREFIX}::POLICIES`

export enum AUTHZ_POLICY {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
}
