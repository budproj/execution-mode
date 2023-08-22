import { UserAvatarProperties } from '../Avatar/avatar'

export interface UserEditableAvatarProperties extends UserAvatarProperties {
  userID?: string
  name?: string
  picture?: string
  size?: string
  isDisabled?: boolean
}
