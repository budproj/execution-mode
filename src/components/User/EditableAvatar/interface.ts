import { UserAvatarProperties } from '../Avatar/avatar'

export interface UserEditableAvatarProperties extends UserAvatarProperties {
  userID?: string
  name?: string
  isLoaded?: boolean
  picture?: string
  size?: string
  isDisabled?: boolean
  handleUpdatePicture?: () => Promise<any>
}
