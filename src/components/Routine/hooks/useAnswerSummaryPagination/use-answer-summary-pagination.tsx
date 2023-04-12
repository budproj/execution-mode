import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { filteredUsersCompany, selectUserFromCompany } from 'src/state/recoil/team/users-company'
import meAtom from 'src/state/recoil/user/me'

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const userID = useRecoilValue(meAtom)
  const me = useRecoilValue(selectUserFromCompany(userID))

  const teamUsersWithoutMe = teamUsers.filter(({ id }) => id !== me?.id)
  const companyUsers = me ? [me, ...teamUsersWithoutMe] : teamUsers

  const answersSummary = useRecoilValue(answerSummaryAtom)

  const REQUEST_LIMIT = answersSummary.length === 0 ? 10 : 4

  const filteredTeamUsers = companyUsers.filter((user) => {
    const matchUser = answersSummary.find(({ userId }) => userId === user.id)
    if (matchUser) return
    return user
  })

  const limitedTeamUsers = filteredTeamUsers.slice(0, REQUEST_LIMIT)

  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
