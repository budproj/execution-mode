import { atom } from 'recoil'

import { BOARD_DOMAIN } from 'src/components/TaskManagement/hooks/use-team-tasks-board-data'
import { TASK_STATUS } from 'src/services/task-management/task-management.service'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TEAM_ID`

export type TaskInsertDrawerProperties = {
  domain: BOARD_DOMAIN
  identifier?: string
  boardID?: string
  column: TASK_STATUS
}

export const taskInsertDrawerTeamID = atom<TaskInsertDrawerProperties>({
  key: KEY,
  default: {
    boardID: undefined,
    domain: BOARD_DOMAIN.TEAM,
    identifier: undefined,
    column: TASK_STATUS.pending,
  },
})
