import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { Task, TASK_STATUS } from 'src/services/task-management/task-management.service'
import { usersCompany } from 'src/state/recoil/team/users-company'

import useTaskCollection from './use-task-collection'

const useLoadUsers = (teamId: Team['id']): User[] => {
  const tasks = useTaskCollection(teamId)
  const companyUsers = useRecoilValue(usersCompany)
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

  return companyUsers.filter((user) => ownersAndSupportTeamMembers.includes(user.id))
}

export default useLoadUsers
