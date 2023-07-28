import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'

import { myselfAtom } from '../../../../state/recoil/shared/atoms'

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))

  const myself = useRecoilValue(myselfAtom)

  const isUserFromTeam = myself?.id && teamUsers.some(({ id }) => id === myself?.id)

  const companyUsers = isUserFromTeam
    ? [myself, ...teamUsers.filter(({ id }) => id !== myself?.id)]
    : teamUsers

  const answersSummary = useRecoilValue(answerSummaryAtom)

  const REQUEST_LIMIT = answersSummary.length === 0 ? 10 : 4

  const filteredTeamUsers = companyUsers.filter(
    (user) => !answersSummary.some(({ userId }) => userId === user.id),
  )

  const limitedTeamUsers = filteredTeamUsers.slice(0, REQUEST_LIMIT)

  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
