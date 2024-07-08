import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { filteredUsersCompany, selectUserFromCompany } from 'src/state/recoil/team/users-company'
import meAtom from 'src/state/recoil/user/me'

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const REQUEST_LIMIT = 10

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))

  const userID = useRecoilValue(meAtom)

  const me = useRecoilValue(selectUserFromCompany(userID))

  const isUserFromTeam = me?.id && teamUsers.some(({ id }) => id === me.id)

  const companyUsers = isUserFromTeam
    ? [me, ...teamUsers.filter(({ id }) => id !== me?.id)]
    : teamUsers

  const answersSummary = useRecoilValue(answerSummaryAtom)

  const filteredTeamUsers = companyUsers.filter(
    (user) => !answersSummary.some(({ userId }) => userId === user.id),
  )

  const limitedTeamUsers = filteredTeamUsers.slice(0, REQUEST_LIMIT)

  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
