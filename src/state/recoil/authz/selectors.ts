import uniq from 'lodash/uniq'
import { selector, selectorFamily } from 'recoil'

import { RecoilSpecificationGetter } from 'src/state/recoil/types'

import authzAtom from './atom'
import { ACTION, AUTHZ_API, PREFIX, RESOURCE, SCOPE, SCOPED_PERMISSION } from './constants'
import { AuthzPermissions, AuthzRolesGroup } from './types'

const KEY = `${PREFIX}::SELECTORS`

export const getRoles = ({ get }: RecoilSpecificationGetter) => {
  const user = get(authzAtom)
  const api = user?.[AUTHZ_API.ROLES] ?? []

  return {
    api,
  }
}

export const selectRoles = selector<AuthzRolesGroup>({
  key: `${KEY}::ROLES`,
  get: getRoles,
})

export const getPermissions = ({ get }: RecoilSpecificationGetter) => {
  const user = get(authzAtom)
  const permissions = user?.[AUTHZ_API.PERMISSIONS] ?? []

  return {
    [RESOURCE.KEY_RESULT]: parseActionScopesForResource(permissions, RESOURCE.KEY_RESULT),
    [RESOURCE.PROGRESS_REPORT]: parseActionScopesForResource(permissions, RESOURCE.PROGRESS_REPORT),
    [RESOURCE.CONFIDENCE_REPORT]: parseActionScopesForResource(
      permissions,
      RESOURCE.CONFIDENCE_REPORT,
    ),
    [RESOURCE.COMPANY]: parseActionScopesForResource(permissions, RESOURCE.COMPANY),
    [RESOURCE.CYCLE]: parseActionScopesForResource(permissions, RESOURCE.CYCLE),
    [RESOURCE.OBJECTIVE]: parseActionScopesForResource(permissions, RESOURCE.OBJECTIVE),
    [RESOURCE.TEAM]: parseActionScopesForResource(permissions, RESOURCE.TEAM),
    [RESOURCE.USER]: parseActionScopesForResource(permissions, RESOURCE.USER),
    [RESOURCE.KEY_RESULT_VIEW]: parseActionScopesForResource(permissions, RESOURCE.KEY_RESULT_VIEW),
  }
}

const parseActionScopesForResource = (permissions: SCOPED_PERMISSION[], resource: RESOURCE) => {
  const resourcePermissions = filterResourcePermissions(permissions, resource)

  return {
    [ACTION.CREATE]: parseScopeForAction(resourcePermissions, ACTION.CREATE),
    [ACTION.READ]: parseScopeForAction(resourcePermissions, ACTION.READ),
    [ACTION.UPDATE]: parseScopeForAction(resourcePermissions, ACTION.UPDATE),
    [ACTION.DELETE]: parseScopeForAction(resourcePermissions, ACTION.DELETE),
  }
}

const filterResourcePermissions = (permissions: SCOPED_PERMISSION[], resource: RESOURCE) =>
  permissions.filter((permission) => permission.includes(`${resource}::`))

const parseScopeForAction = (permissions: SCOPED_PERMISSION[], action: ACTION) => {
  const scopeWeights = {
    [SCOPE.ANY]: 4,
    [SCOPE.COMPANY]: 3,
    [SCOPE.TEAM]: 2,
    [SCOPE.OWNS]: 1,
  }
  const actionPermissions = permissions.filter((permission) => permission.includes(`${action}::`))
  const scopeList = actionPermissions.map(
    (permission) => permission.split(':').slice(-1)[0] as SCOPE,
  )
  const uniqueScopeList = uniq(scopeList)
  const weightedScopeList = uniqueScopeList.map((scope) => ({
    scope,
    weight: scopeWeights[scope],
  }))
  const sortedScopeList = weightedScopeList.sort((previous, next) =>
    previous.weight < next.weight ? 1 : -1,
  )

  const highestScope = sortedScopeList[0]

  return highestScope?.scope
}

export const selectPermissions = selector<AuthzPermissions>({
  key: `${KEY}::PERMISSIONS`,
  get: getPermissions,
})

export const getCanFlag = (requiredPermissions?: SCOPED_PERMISSION | SCOPED_PERMISSION[]) => ({
  get,
}: RecoilSpecificationGetter) => {
  if (!requiredPermissions) return true
  const user = get(authzAtom)
  const userPermissions = user?.[AUTHZ_API.PERMISSIONS] ?? []

  return Array.isArray(requiredPermissions)
    ? requiredPermissions.every((permission) => userPermissions.includes(permission))
    : userPermissions.includes(requiredPermissions)
}

export const can = selectorFamily<boolean, SCOPED_PERMISSION | SCOPED_PERMISSION[] | undefined>({
  key: `${KEY}::CAN`,
  get: getCanFlag,
})
