export enum AuthzRoles {
  TEAM_MEMBER = 'Team Member',
  LEADER = 'Leader',
  SQUAD_MEMBER = 'Squad Member',
  ADMIN = 'Admin',
}

export enum UppercasedEnvironment {
  PRODUCTION = 'PRODUCTION',
  DEVELOP = 'DEVELOP',
  LOCAL = 'LOCAL',
}

export enum AuthzTenant {
  PRODUCTION = 'https://api.getbud.co',
  DEVELOP = 'https://api.develop.getbud.co',
  LOCAL = 'https://api.develop.getbud.co',
}

export enum AuthzTenantRole {
  PRODUCTION = 'https://api.getbud.co/roles',
  DEVELOP = 'https://api.develop.getbud.co/roles',
  LOCAL = 'https://api.develop.getbud.co/roles',
}

export interface AuthzRolesGroup {
  api: AuthzRoles[]
}

export interface AuthzUser {
  email: string
  email_verified: boolean
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: Date
  [AuthzTenantRole.PRODUCTION]?: AuthzRoles[]
  [AuthzTenantRole.DEVELOP]?: AuthzRoles[]
}
