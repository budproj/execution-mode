import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import useAnswerSummaryFormatter from 'src/components/Routine/RetrospectiveTab/Answers/utils/answer-summary-formatter'
import { AnswerSummary } from 'src/components/Routine/RetrospectiveTab/types'
import { formatUUIDArray } from 'src/components/Routine/RetrospectiveTab/use-logic'
import { Team } from 'src/components/Team/types'

type getAnswersProperties = {
  teamId: Team['id']
  teamUsersIds: string[]
  after: Date
  before: Date
}

type useGetAnswersProperties = {
  getAnswers: ({
    after,
    before,
    teamUsersIds,
  }: getAnswersProperties) => Promise<AnswerSummary[] | undefined>
}

const useGetAnswers = (): useGetAnswersProperties => {
  const { servicesPromise } = useContext(ServicesContext)
  const { formattedAnswerSummary } = useAnswerSummaryFormatter()

  const getAnswers = async ({
    teamId,
    after,
    before,
    teamUsersIds,
  }: getAnswersProperties): Promise<AnswerSummary[] | undefined> => {
    try {
      const { routines } = await servicesPromise

      const parsetToQueryTeamUsersIDS = encodeURIComponent(formatUUIDArray(teamUsersIds))

      const answersSummaryData = await routines.getAnswers(
        teamId,
        parsetToQueryTeamUsersIDS,
        after,
        before,
      )

      const formattedData = formattedAnswerSummary({
        requestedUsersIDs: teamUsersIds,
        answerSummary: answersSummaryData,
      })

      return formattedData
    } catch (error: unknown) {
      console.error('Error in useFetchSummaryData:', error)
    }
  }

  return { getAnswers }
}

/**
 * [useGetAnswersMutation - mutation that fetch answers to retrospective]
 * @param  {[string]} teamId [Selected team ID]
 * @param  {[Date]} after [Selected min date range to answers]
 * @param  {[Date]} before [Selected max date range to answers]
 * @param  {[string[]]} teamUsersIds [Filter users to get answers]
 * @return {[AnswerSummary[]]} [Summarized answers]
 */
export function useGetAnswersMutation({
  teamId,
  after,
  before,
  teamUsersIds,
}: getAnswersProperties) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`routines:getAnswer:${teamId}`, [teamId, after, before, ...teamUsersIds]],
    queryFn: async () => {
      const { routines } = await servicesPromise
      if (teamUsersIds.length === 0) return []
      const queryTeamUsersIds = encodeURIComponent(formatUUIDArray(teamUsersIds))
      const data = await routines.getAnswers(teamId, queryTeamUsersIds, after, before)
      return data
    },
  })

  return query
}

export default useGetAnswers
