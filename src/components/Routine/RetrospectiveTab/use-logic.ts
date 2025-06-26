/* eslint-disable import/order */
import { useEffect, useState } from 'react'
import { format, parse, differenceInDays } from 'date-fns'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { GraphQLEffect } from 'src/components/types'

import { teamAtomFamily } from 'src/state/recoil/team'
import { usersCompany } from 'src/state/recoil/team/users-company'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { answerSummaryLoadStateAtom } from 'src/state/recoil/routine/users-summary-load-state'
import { answerSummaryPaginationAtom } from 'src/state/recoil/routine/cursor-answer-summary-pagination'
import {
  getRoutineDateRangeDateFormat,
  routineDatesRangeAtom,
} from 'src/state/recoil/routine/routine-dates-range'

import { useAnswerSummaryPagination } from '../hooks/useAnswerSummaryPagination'
import useGetAnswers from '../hooks/new/use-get-answers'
import { NextRouter } from 'next/router'
import { useNotificationSettings } from '../hooks/new/use-get-notifications-settings'

export const formatUUIDArray = (uuids: string[]) => {
  return "['" + uuids.join("', '") + "']"
}

export const useLogic = (teamId: string, router: NextRouter) => {
  // Local states
  const [isFirstTime, setIsFirstTime] = useState(false)

  // Global states
  const [{ after, before, week }, setRoutineDatesRange] = useRecoilState(routineDatesRangeAtom)
  const setAnswerSummaryPaginationData = useSetRecoilState(answerSummaryPaginationAtom)
  const [isAnswerSummaryLoading, setIsAnswerSummaryLoading] = useRecoilState(
    answerSummaryLoadStateAtom,
  )
  const [answersSummary, setAnswersSummary] = useRecoilState(answerSummaryAtom)
  const setUsersCompany = useSetRecoilState(usersCompany)
  const team = useRecoilValue(teamAtomFamily(teamId))

  // Permission
  const canEditTeam = team?.policy?.update === GraphQLEffect.ALLOW

  // Date range for Answers hook
  const { after: afterQuery, before: beforeQuery } = router.query
  const afterQueryData = Array.isArray(afterQuery) ? afterQuery[0] : afterQuery
  const beforeQueryData = Array.isArray(beforeQuery) ? beforeQuery[0] : beforeQuery

  // Hooks
  const { teamOptedOut, toggleDisabledTeam } = useNotificationSettings(teamId)
  const { limitedTeamUsers } = useAnswerSummaryPagination(teamId)
  const { getAnswers } = useGetAnswers()
  const toggleNotifcation = () => {
    toggleDisabledTeam(teamId)
  }

  const handleGetNoCurrentAnswers = async (after: Date, before: Date) => {
    setIsAnswerSummaryLoading(true)
    const showedUsersIds = answersSummary.map((answer) => answer.userId)
    setAnswersSummary([])

    const newFormattedData = await getAnswers({
      teamId,
      after,
      before,
      teamUsersIds: showedUsersIds,
    })
    if (newFormattedData) setAnswersSummary(newFormattedData)
    setIsAnswerSummaryLoading(false)
  }

  const fetchAnswerSummaryData = async () => {
    const teamUsersIds = limitedTeamUsers.map((user) => user.id)

    const usersAreBeingRequestedForTheFirstTime = !teamUsersIds.some((userId) => {
      return answersSummary.some((user) => user.userId === userId)
    })

    if (usersAreBeingRequestedForTheFirstTime && teamUsersIds.length > 0) {
      setIsAnswerSummaryLoading(true)
      setAnswerSummaryPaginationData({
        lastLoadedUserId: teamUsersIds[teamUsersIds.length - 1],
        teamId,
      })
      const newFormattedData = await getAnswers({ teamId, after, before, teamUsersIds })
      if (newFormattedData)
        setAnswersSummary((previousAnswers) => [...previousAnswers, ...newFormattedData])
      setIsAnswerSummaryLoading(false)
    }
  }

  const handleViewMore = () => {
    if (isAnswerSummaryLoading) return

    if (limitedTeamUsers.length === 0) return
    fetchAnswerSummaryData()
  }

  // Re-render parts
  useEffect(() => {
    if (after && before) {
      router.push(
        {
          query: {
            ...(router?.query ?? {}),
            after: format(after, 'dd/MM/yyyy'),
            before: format(before, 'dd/MM/yyyy'),
          },
        },
        undefined,
        { shallow: true },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [after, before])

  useEffect(() => {
    if (afterQueryData && beforeQueryData) {
      const parsedAfter = parse(afterQueryData, 'dd/MM/yyyy', new Date())
      const parsedBefore = parse(beforeQueryData, 'dd/MM/yyyy', new Date())
      const { week } = getRoutineDateRangeDateFormat(parsedAfter)

      const diffAfter = parsedAfter ? differenceInDays(after, parsedAfter) : 0
      const diffBefore = parsedBefore ? differenceInDays(before, parsedBefore) : 0

      if (diffAfter || diffBefore) {
        setRoutineDatesRange({
          after: diffAfter ? parsedAfter : after,
          before: diffBefore ? parsedBefore : before,
          week,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isAnswerSummaryLoading) return
    if (limitedTeamUsers.length === 0) return
    fetchAnswerSummaryData()
    setAnswersSummary([])
    setUsersCompany([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, limitedTeamUsers])

  return {
    isAnswerSummaryLoading,
    isFirstTime,
    teamOptedOut,
    limitedTeamUsers,
    canEditTeam,
    after,
    before,
    week,
    setIsFirstTime,
    toggleNotifcation,
    handleGetNoCurrentAnswers,
    fetchAnswerSummaryData,
    handleViewMore,
  }
}
