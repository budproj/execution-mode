import { USER_GENDER } from '../../../components/User/constants'

export type AmplitudeUser = {
  id: string
  name: string
  email: string
  gender: USER_GENDER
  role: string
  createdAt: string
}

export type AmplitudeUserGroups = {
  companies: string[]
  teams: string[]
}

export type AmplitudeStaticAttributes = {
  deviceID?: string
  sessionID?: number
}
