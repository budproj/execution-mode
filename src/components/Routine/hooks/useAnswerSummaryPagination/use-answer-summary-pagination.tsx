import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { answerSummaryPaginationAtom } from 'src/state/recoil/routine/cursor-answer-summary-pagination'
import { filteredUsersCompany, selectUser } from 'src/state/recoil/team/users-company'

const rateLimit = 2

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const { lastLoadedUser: lastLoadedUserId } = useRecoilValue(answerSummaryPaginationAtom)
  const lastLoadedUser = useRecoilValue(selectUser(lastLoadedUserId ?? ''))

  const cursorPaginationItem = lastLoadedUser ? teamUsers.indexOf(lastLoadedUser) : 0
  console.log({ teamUsers, lastLoadedUser })

  const limitedTeamUsers = teamUsers.slice(cursorPaginationItem, rateLimit)

  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
