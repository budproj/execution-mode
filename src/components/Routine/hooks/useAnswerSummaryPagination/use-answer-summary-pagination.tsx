import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { answerSummaryPaginationAtom } from 'src/state/recoil/routine/cursor-answer-summary-pagination'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
  lastLoadedIndex: number
  teamUsersQuantity: number
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const { lastLoadedUserId } = useRecoilValue(answerSummaryPaginationAtom)
  const answersSummary = useRecoilValue(answerSummaryAtom)

  const REQUEST_LIMIT = answersSummary.length === 0 ? 10 : 4

  const { data: lastLoadedUser } = useGetUserDetails(lastLoadedUserId)

  const lastLoadedUserIndex = teamUsers.findIndex((user) => user.id === lastLoadedUser?.id)
  const lastUserListedIsNotTheLastTeamUser =
    answersSummary.length < teamUsers.length && lastLoadedUserIndex === teamUsers.length - 1

  const lastLoadedIndex = lastUserListedIsNotTheLastTeamUser
    ? lastLoadedUserIndex - 1
    : lastLoadedUserIndex

  const cursorPaginationItem = lastLoadedUserId ? lastLoadedIndex + 1 : 0

  const endSlice = cursorPaginationItem + REQUEST_LIMIT

  const limitedTeamUsers =
    answersSummary.length < teamUsers.length ? teamUsers.slice(cursorPaginationItem, endSlice) : []

  return { limitedTeamUsers, lastLoadedIndex, teamUsersQuantity: teamUsers.length }
}

export default useAnswerSummaryPagination
