import { User } from 'src/components/User/types'
import { TASK_STATUS } from 'src/services/task-management/@types/task-status.enum'
import { Task } from 'src/services/task-management/@types/task.type'

interface UseLoadOwnersAndSupportTeamProperties {
  pending: Task[]
  toDo: Task[]
  doing: Task[]
  done: Task[]
}

const loadOwnersAndSupportTeam = (tasks: UseLoadOwnersAndSupportTeamProperties) => {
  const ownersAndSupportTeamMembers = Object.values(TASK_STATUS).reduce(
    (accumulator: User[], columnType: TASK_STATUS) => {
      const columnTasks = tasks[columnType]
      const members = columnTasks.reduce((members: User[], task: Task) => {
        const { usersRelated } = task
        const filterUsers = usersRelated.filter((user) => {
          return !members.some((member) => member.id === user.id)
        })
        return [...members, ...filterUsers]
      }, [])
      const filteredMembers = members.filter((member) => {
        return !accumulator.some((user) => user.id === member.id)
      })
      return [...accumulator, ...filteredMembers]
    },
    [],
  )

  return ownersAndSupportTeamMembers
}

export default loadOwnersAndSupportTeam
