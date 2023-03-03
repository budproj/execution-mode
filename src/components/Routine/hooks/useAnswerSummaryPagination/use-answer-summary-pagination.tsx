import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { answerSummaryPaginationAtom } from 'src/state/recoil/routine/cursor-answer-summary-pagination'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'

const rateLimit = 10

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const { lastLoadedUserId } = useRecoilValue(answerSummaryPaginationAtom)
  const answersSummary = useRecoilValue(answerSummaryAtom)
  const { data: lastLoadedUser } = useGetUserDetails(lastLoadedUserId)

  const lastLoadedIndex = teamUsers.findIndex((user) => user.id === lastLoadedUser?.id)

  const cursorPaginationItem = lastLoadedUserId ? lastLoadedIndex + 1 : 0

  const endSlice = cursorPaginationItem + rateLimit

  const limitedTeamUsers =
    answersSummary.length < teamUsers.length ? teamUsers.slice(cursorPaginationItem, endSlice) : []

  return { limitedTeamUsers }
}

export default useAnswerSummaryPagination
