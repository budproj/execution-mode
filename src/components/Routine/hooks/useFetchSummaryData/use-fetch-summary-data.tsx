import { useCallback, useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'

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
  }: fetchAnswersProperties) => Promise<AnswerSummary[] | undefined>
}

const useFetchSummaryData = (): AnswerSummaryPaginationProperties => {
  const { servicesPromise } = useContext(ServicesContext)
  const { formattedAnswerSummary } = useAnswerSummaryFormatter()

  const fetchAnswers = useCallback(
    async ({
      teamId,
      after,
      before,
      teamUsersIds,
    }: fetchAnswersProperties): Promise<AnswerSummary[] | undefined> => {
      try {
        const { routines } = await servicesPromise

        const parsetToQueryTeamUsersIDS = encodeURIComponent(formatUUIDArray(teamUsersIds))

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
      } catch (error: unknown) {
        console.error('Error in useFetchSummaryData:', error)
      }
    },
    [formattedAnswerSummary, servicesPromise],
  )

  return { fetchAnswers }
}

export default useFetchSummaryData
