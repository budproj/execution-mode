export enum AuthzRoles {
  TEAM_MEMBER = 'Team Member',
  LEADER = 'Leader',
  SQUAD_MEMBER = 'Squad Member',
  ADMIN = 'Admin',
}

export interface AuthzRolesGroup {
  api: AuthzRoles[]
}

export interface AuthzUser {
  email: string
  email_verified: boolean
  'https://api.getbud.co/roles': AuthzRoles[]
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: Date
}
