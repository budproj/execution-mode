import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const answersSummary = useRecoilValue(answerSummaryAtom)

  const REQUEST_LIMIT = answersSummary.length === 0 ? 10 : 4

  const filteredTeamUsers = teamUsers.filter((user) => {
    const matchUser = answersSummary.find(({ userId }) => userId === user.id)
    if (matchUser) return
    return user
  })

  const limitedTeamUsers = filteredTeamUsers.slice(0, REQUEST_LIMIT)

  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
