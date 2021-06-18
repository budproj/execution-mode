import { atomFamily } from 'recoil'

import { PREFIX } from './constants'

export enum ObjectivesViewMode {
  ACTIVE = 'active',
  NOT_ACTIVE = 'not-active',
}

export const teamObjectivesViewMode = atomFamily<ObjectivesViewMode, string | undefined>({
  key: `${PREFIX}::OBJECTIVES_VIEW_MODE`,
  default: ObjectivesViewMode.ACTIVE,
})
