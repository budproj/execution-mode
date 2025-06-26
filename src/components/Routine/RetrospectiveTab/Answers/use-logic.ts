import { format, isBefore } from 'date-fns'
import debounce from 'lodash/debounce'
import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { isAnswerSummaryLoad } from 'src/state/recoil/routine/is-answers-summary-load'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import {
  getRoutineDateRangeDateFormat,
  isNextWeekDisabled,
  routineDatesRangeAtom,
} from 'src/state/recoil/routine/routine-dates-range'
import { answerSummaryLoadStateAtom } from 'src/state/recoil/routine/users-summary-load-state'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import useGetAnswers from '../../hooks/new/use-get-answers'
import { useAnswerSummaryPagination } from '../../hooks/useAnswerSummaryPagination'
import { AnswerSummary } from '../types'

const SEARCH_CHARACTERS_LIMIT = 3

interface useLogicProperties {
  teamId: string
  before: Date
  after: Date
  router: NextRouter
  onGetNoCurrentAnswers: (after: Date, before: Date) => Promise<void>
}

export function useLogic({
  teamId,
  before,
  after,
  onGetNoCurrentAnswers,
  router,
}: useLogicProperties) {
  // Events
  const { dispatch: dispatchAnswerNowFormClick } = useEvent(EventType.ANSWER_NOW_FORM_CLICK)
  const { dispatch: dispatchChangeTimePeriod } = useEvent(EventType.CHANGE_TIME_PERIOD_CLICK)

  // Local States
  const [search, setSearch] = useState('')
  const [showAnswerNowButton, setShowAnswerNowButton] = useState<boolean>(false)
  const [filteredAnswers, setFilteredAnswers] = useState<AnswerSummary[]>([])

  // Global States
  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))

  const [date, setDate] = useRecoilState(routineDatesRangeAtom)
  const [answersSummary, setAnswersSummary] = useRecoilState(answerSummaryAtom)
  const [isAnswerSummaryLoading, setIsAnswerSummaryLoading] = useRecoilState(
    answerSummaryLoadStateAtom,
  )

  const setIsAnswerSummaryLoaded = useSetRecoilState(isAnswerSummaryLoad)
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)

  // Hooks
  const { getAnswers } = useGetAnswers()
  const { limitedTeamUsers } = useAnswerSummaryPagination(teamId)
  const [userTeams, updateTeams] = useConnectionEdges(user?.teams?.edges)
  const [userCompanies, updateUserCompanies] = useConnectionEdges(user?.companies?.edges)

  const setNewDate = async (newDate: Date) => {
    const dateRange = getRoutineDateRangeDateFormat(newDate)
    setDate(dateRange)

    router.push(
      {
        query: {
          ...(router?.query ?? {}),
          before: format(dateRange.before, 'dd/MM/yyyy'),
          after: format(dateRange.after, 'dd/MM/yyyy'),
        },
      },
      undefined,
      { shallow: true },
    )

    await onGetNoCurrentAnswers(dateRange.after, dateRange.before)
  }

  const performDebounced = async (searchTerm: string) => {
    const usersSearched = teamUsers.filter((user) =>
      user.fullName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
    )

    const teamUsersIds = usersSearched.map((user) => user.id)

    const usersAreBeingRequestedForTheFirstTime = !teamUsersIds.some((userId) => {
      return answersSummary.some((user) => user.userId === userId)
    })

    if (usersAreBeingRequestedForTheFirstTime && teamUsersIds.length > 0) {
      const searchDataFormatted = await getAnswers({ teamId, after, before, teamUsersIds })

      if (searchDataFormatted)
        setAnswersSummary((previousAnswers) => [...previousAnswers, ...searchDataFormatted])
    }

    setIsAnswerSummaryLoading(false)
  }

  const handleSearch = async (value: string) => {
    if (value.length >= SEARCH_CHARACTERS_LIMIT) {
      setSearch(value)
      setIsAnswerSummaryLoading(true)
      await debouncedSearch(value)
    } else {
      setIsAnswerSummaryLoading(false)
      setSearch('')
    }
  }

  // Utils
  function usersAnswers() {
    const uniqueIds = new Set()
    return answersSummary.filter((answer) => {
      if (
        answer.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
        !uniqueIds.has(answer.userId)
      ) {
        uniqueIds.add(answer.userId)
        return true
      }

      return false
    })
  }

  const debouncedSearch = debounce(performDebounced, 2500)

  useEffect(() => {
    updateTeams(user?.teams?.edges)
    updateUserCompanies(user?.companies?.edges)
  }, [updateTeams, updateUserCompanies, user?.companies?.edges, user?.teams])

  useEffect(() => {
    const userTeamIds = userTeams.map((team) => team.id)
    const userCompanie = userCompanies[0]?.id
    const isUserFromTheTeam = [...userTeamIds, userCompanie].includes(teamId)
    const isActiveRoutine = isBefore(new Date(), before)
    const haveUserAnswered = answersSummary.find(
      (answer) => answer.userId === userID && answer.timestamp,
    )
    setShowAnswerNowButton(
      Boolean(
        isUserFromTheTeam && isActiveRoutine && !haveUserAnswered && answersSummary.length > 0,
      ),
    )
    setFilteredAnswers(usersAnswers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId])

  return {
    date,
    isAnswerSummaryLoading,
    limitedTeamUsers,
    search,
    SEARCH_CHARACTERS_LIMIT,
    showAnswerNowButton,
    filteredAnswers,
    setIsAnswerSummaryLoaded,
    setNewDate,
    dispatchChangeTimePeriod,
    dispatchAnswerNowFormClick,
    isNextWeekDisabled,
    handleSearch,
    setIsRoutineDrawerOpen,
  }
}
