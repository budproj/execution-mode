export const PREFIX = 'AUTHZ'

export enum AUTHZ_ROLES {
  TEAM_MEMBER = 'Team Member',
  LEADER = 'Leader',
  SQUAD_MEMBER = 'Squad Member',
  ADMIN = 'Admin',
}

export enum UPPERCASED_ENVIRONMENT {
  PRODUCTION = 'PRODUCTION',
  DEVELOP = 'DEVELOP',
  LOCAL = 'LOCAL',
}

export enum AUTHZ_TENANT {
  PRODUCTION = 'https://api.getbud.co',
  DEVELOP = 'https://api.develop.getbud.co',
  LOCAL = 'https://api.develop.getbud.co',
}

export enum AUTHZ_TENANT_ROLE {
  PRODUCTION = 'https://api.getbud.co/roles',
  DEVELOP = 'https://api.develop.getbud.co/roles',
  LOCAL = 'https://api.develop.getbud.co/roles',
}
