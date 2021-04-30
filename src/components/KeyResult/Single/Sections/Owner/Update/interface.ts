import { User } from 'src/components/User/types'

export interface KeyResultSingleSectionOwnerUpdateProperties {
  keyResultID?: string
  isOpen?: boolean
}

export interface KeyResultSingleSectionOwnerUpdateUserListProperties {
  users: User[]
  keyResultID?: string
}

export interface KeyResultSingleSectionOwnerUpdateUserListSkeletonProperties {
  numberOfSkeletons?: number
}

export interface KeyResultSingleSectionOwnerUpdateSearchProperties {
  onChange?: (searchValue: string) => void
}
