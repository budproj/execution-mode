import { Team } from 'src/components/Team/types'
import { TASK_STATUS as ColumnType } from 'src/services/task-management/task-management.service'

import { useTeamTasksBoardData } from '../../hooks/use-team-tasks-board-data'

const useTaskCollection = (teamId: Team['id']) => {
  const { data: boardData, isError } = useTeamTasksBoardData(teamId)

  if (isError) {
    console.error('Error fetching board data', isError)
  }

  const tasks = {
    pending: boardData?.tasks.filter((task) => task.status === ColumnType.pending) ?? [],
    toDo: boardData?.tasks.filter((task) => task.status === ColumnType.toDo) ?? [],
    doing: boardData?.tasks.filter((task) => task.status === ColumnType.doing) ?? [],
    done: boardData?.tasks.filter((task) => task.status === ColumnType.done) ?? [],
  }

  return tasks
}

export default useTaskCollection
