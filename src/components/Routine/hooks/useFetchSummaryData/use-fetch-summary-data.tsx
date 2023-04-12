import { useCallback, useContext } from 'react'
import { useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'
import { answerSummaryPaginationAtom } from 'src/state/recoil/routine/cursor-answer-summary-pagination'

import useAnswerSummaryFormatter from '../../RetrospectiveTab/Answers/utils/answer-summary-formatter'
import { AnswerSummary, formatUUIDArray } from '../../RetrospectiveTab/retrospective-tab-content'

type fetchAnswersProperties = {
  teamId: Team['id']
  teamUsersIds: string[]
  after: Date
  before: Date
}

type AnswerSummaryPaginationProperties = {
  fetchAnswers: ({
    after,
    before,
    teamUsersIds,
  }: fetchAnswersProperties) => Promise<AnswerSummary[]>
}

const useFetchSummaryData = (): AnswerSummaryPaginationProperties => {
  const setAnswerSummaryPaginationData = useSetRecoilState(answerSummaryPaginationAtom)
  const { servicesPromise } = useContext(ServicesContext)
  const { formattedAnswerSummary } = useAnswerSummaryFormatter()

  const fetchAnswers = useCallback(
    async ({
      teamId,
      after,
      before,
      teamUsersIds,
    }: fetchAnswersProperties): Promise<AnswerSummary[]> => {
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
    [formattedAnswerSummary, servicesPromise, setAnswerSummaryPaginationData],
  )

  return { fetchAnswers }
}

export default useFetchSummaryData
