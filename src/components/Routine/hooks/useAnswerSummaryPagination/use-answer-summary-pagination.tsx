import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'
import { answerSummaryPaginationAtom } from 'src/state/recoil/routine/cursor-answer-summary-pagination'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'

const rateLimit = 2

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const { lastLoadedUserId } = useRecoilValue(answerSummaryPaginationAtom)
  const { data: lastLoadedUser } = useGetUserDetails(lastLoadedUserId)

  const lastLoadedIndex = teamUsers.findIndex((user) => user.id === lastLoadedUser?.id)

  const cursorPaginationItem = lastLoadedUserId ? lastLoadedIndex : 0

  const endSlice = cursorPaginationItem + rateLimit

  const limitedTeamUsers = teamUsers.slice(cursorPaginationItem, endSlice)

  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
