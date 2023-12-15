import { atom } from 'recoil'

import { TASK_STATUS } from 'src/services/task-management/task-management.service'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TEAM_ID`

export type TaskInsertDrawerProperties = {
  boardID?: string
  column: TASK_STATUS
}

export const taskInsertDrawerTeamID = atom<TaskInsertDrawerProperties>({
  key: KEY,
  default: { boardID: undefined, column: TASK_STATUS.PENDING },
})
