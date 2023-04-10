import { useCallback, useContext } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { answerSummaryPaginationAtom } from 'src/state/recoil/routine/cursor-answer-summary-pagination'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'

import useAnswerSummaryFormatter from '../../RetrospectiveTab/Answers/utils/answer-summary-formatter'
import { AnswerSummary, formatUUIDArray } from '../../RetrospectiveTab/retrospective-tab-content'

type fetchAnswersProperties = {
  teamUsersIds: string[]
  after: Date
  before: Date
}

type AnswerSummaryPaginationProperties = {
  limitedTeamUsers: User[]
  fetchAnswers: ({
    after,
    before,
    teamUsersIds,
  }: fetchAnswersProperties) => Promise<AnswerSummary[]>
}

const useAnswerSummaryPagination = (teamId: Team['id']): AnswerSummaryPaginationProperties => {
  const setAnswerSummaryPaginationData = useSetRecoilState(answerSummaryPaginationAtom)
  const { servicesPromise } = useContext(ServicesContext)
  const { formattedAnswerSummary } = useAnswerSummaryFormatter()
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const answersSummary = useRecoilValue(answerSummaryAtom)

  const REQUEST_LIMIT = answersSummary.length === 0 ? 10 : 4

  const filteredTeamUsers = teamUsers.filter((user) => {
    const matchUser = answersSummary.find(({ userId }) => userId === user.id)
    if (matchUser) return
    return user
  })

  const limitedTeamUsers = filteredTeamUsers.slice(0, REQUEST_LIMIT)

  const fetchAnswers = useCallback(
    async ({ after, before, teamUsersIds }: fetchAnswersProperties): Promise<AnswerSummary[]> => {
      const { routines } = await servicesPromise

      const parsetToQueryTeamUsersIDS = encodeURIComponent(formatUUIDArray(teamUsersIds))

      setAnswerSummaryPaginationData({
        lastLoadedUserId: teamUsersIds[teamUsersIds.length - 1],
        teamId,
      })
      const { data: answersSummaryData } = await routines.get<AnswerSummary[]>(
        `/answers/summary/${teamId}`,
        {
          params: {
            before,
            after,
            includeSubteams: false,
            teamUsersIds: parsetToQueryTeamUsersIDS,
          },
        },
      )

      const formattedData = formattedAnswerSummary({
        requestedUsersIDs: teamUsersIds,
        answerSummary: answersSummaryData,
      })

      return formattedData
    },
    [formattedAnswerSummary, servicesPromise, setAnswerSummaryPaginationData, teamId],
  )

  return { limitedTeamUsers, fetchAnswers }
}

export default useAnswerSummaryPagination
