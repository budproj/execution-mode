import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { filteredUsersCompany, selectUserFromCompany } from 'src/state/recoil/team/users-company'
import meAtom from 'src/state/recoil/user/me'

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const REQUEST_LIMIT = 10

export const useCheckIfCurrentUserIsFromTeam = (teamId: Team['id']): User[] => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const userID = useRecoilValue(meAtom)
  const me = useRecoilValue(selectUserFromCompany(userID))

  const isUserFromTeam = me?.id && teamUsers.some(({ id }) => id === me.id)
  return isUserFromTeam ? [me, ...teamUsers.filter(({ id }) => id !== me?.id)] : teamUsers
}

const useAnswerSummaryPagination = (
  teamId: Team['id'],
  users: string[],
): AnswerSummaryPaginationProperties => {
  const companyUsers = useCheckIfCurrentUserIsFromTeam(teamId)
  const filteredTeamUsers = companyUsers.filter((user) => !users.includes(user.id))
  const limitedTeamUsers = filteredTeamUsers.slice(0, REQUEST_LIMIT)
  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
