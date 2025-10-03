import { atom } from 'recoil'

import { TASK_STATUS } from 'src/services/task-management/@types/task-status.enum'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TEAM_ID`

export type TaskInsertDrawerProperties = {
  teamId?: string
  column: TASK_STATUS
}

export const taskInsertDrawerTeamID = atom<TaskInsertDrawerProperties>({
  key: KEY,
  default: {
    teamId: undefined,
    column: TASK_STATUS.pending,
  },
})
