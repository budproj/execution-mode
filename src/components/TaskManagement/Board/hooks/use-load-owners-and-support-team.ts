import { User } from 'src/components/User/types'
import { Task, TASK_STATUS } from 'src/services/task-management/task-management.service'

interface UseLoadOwnersAndSupportTeamProperties {
  pending: Task[]
  toDo: Task[]
  doing: Task[]
  done: Task[]
}

const loadOwnersAndSupportTeam = (
  tasks: UseLoadOwnersAndSupportTeamProperties,
  usersToFilter: User[],
) => {
  const ownersAndSupportTeamMembers = Object.values(TASK_STATUS).reduce(
    (accumulator: string[], columnType: TASK_STATUS) => {
      const columnTasks = tasks[columnType]
      const members = columnTasks.reduce((members: string[], task: Task) => {
        const { owner, supportTeamMembers } = task
        return [...members, ...supportTeamMembers, owner]
      }, [])
      return [...accumulator, ...members]
    },
    [],
  )

  return usersToFilter.filter((user) => ownersAndSupportTeamMembers.includes(user.id))
}

export default loadOwnersAndSupportTeam
