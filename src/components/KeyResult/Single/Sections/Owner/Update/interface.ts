import { User } from 'src/components/User/types'

export interface KeyResultSingleSectionOwnerUpdateProperties {
  keyResultID?: string
  isOpen?: boolean
  onSubmit?: (userID: string) => void
}

export interface KeyResultSingleSectionOwnerUpdateUserListProperties {
  users: User[]
  keyResultID?: string
  onSubmit?: (userID: string) => void
}

export interface KeyResultSingleSectionOwnerUpdateUserListSkeletonProperties {
  numberOfSkeletons?: number
}

export interface KeyResultSingleSectionOwnerUpdateSearchProperties {
  onChange?: (searchValue: string) => void
}
