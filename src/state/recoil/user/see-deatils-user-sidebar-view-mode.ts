import { atom } from 'recoil'

import { User } from 'src/components/User/types'

import { PREFIX } from './constants'

interface SeeDetailsUserSidebarViewModeProperties {
  isOpened: boolean
  userId: User['id'] | undefined
}

export const seeDetailsUserSidebarViewMode = atom<SeeDetailsUserSidebarViewModeProperties>({
  key: `${PREFIX}::DETAILS_USER_SIDEBAR_VIEW_MODE`,
  default: {
    isOpened: false,
    userId: '',
  },
})
