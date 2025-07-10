import { isBefore } from 'date-fns'
import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import { isNextWeekDisabled } from 'src/state/recoil/routine/routine-dates-range'
import { filteredUsersCompany } from 'src/state/recoil/team/users-company'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import { AnswerSummary } from '../types'

const SEARCH_CHARACTERS_LIMIT = 3

interface useLogicProperties {
  teamId: string
  before: Date
  after: Date
  router: NextRouter
  dataAnswers: AnswerSummary[] | undefined
  loadingAnswers: boolean
  usersSelected: string[]
  setUsersSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export function useLogic({
  teamId,
  before,
  dataAnswers,
  loadingAnswers,
  usersSelected,
  setUsersSelected,
}: useLogicProperties) {
  // Events - ok
  const { dispatch: dispatchAnswerNowFormClick } = useEvent(EventType.ANSWER_NOW_FORM_CLICK)
  const { dispatch: dispatchChangeTimePeriod } = useEvent(EventType.CHANGE_TIME_PERIOD_CLICK)

  // Local States
  const [search, setSearch] = useState('')
  const [showAnswerNowButton, setShowAnswerNowButton] = useState<boolean>(false)
  const [filteredAnswers, setFilteredAnswers] = useState<AnswerSummary[]>([])
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false)

  // Global States
  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)

  const formattedAnswerSummary = (answers: AnswerSummary[], isSearch: boolean) => {
    const answersFormatted = usersSelected.map((userId) => {
      const user = teamUsers.find((user) => user.id === userId)
      const { id, latestStatusReply, timestamp, commentCount } =
        answers.find((answer) => answer.userId === userId) ?? {}

      return {
        id,
        userId,
        name: user ? user.fullName : '',
        picture: user ? user.picture : '',
        latestStatusReply,
        timestamp,
        commentCount,
      }
    })
    if (isSearch) {
      return answersFormatted.filter((answer) => Boolean(answer.id))
    }

    return answersFormatted
  }

  const performDebounced = async (searchTerm: string) => {
    // Search users and create an array of ids
    const usersSearched = teamUsers.filter((user) =>
      user.fullName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
    )

    const teamUsersIds = usersSearched.map((user) => user.id)

    setUsersSelected((previousState) => {
      const newUsers = teamUsersIds.filter((item) => !previousState.includes(item))
      return [...previousState, ...newUsers]
    })

    if (dataAnswers)
      setFilteredAnswers(
        reorderAnswers(
          dataAnswers.filter((item) => teamUsersIds.includes(item.userId)),
          true,
        ),
      )
  }

  const handleSearch = async (value: string) => {
    setLoadingSearch(true)
    if (value.length >= SEARCH_CHARACTERS_LIMIT) {
      setSearch(value)
      await performDebounced(value)
    } else {
      setSearch('')
      if (dataAnswers) setFilteredAnswers(reorderAnswers(dataAnswers))
    }

    setLoadingSearch(false)
  }

  const reorderAnswers = (answers: AnswerSummary[], isSearch?: boolean) => {
    const answersFormatted = formattedAnswerSummary(answers, isSearch ?? false)
    const answersReordered = answersFormatted.sort((a, b) => {
      if (a.name && b.name) return a.name.localeCompare(b.name)
      return 0
    })
    const currentUserAnswer = answersReordered.find((answer) => answer.userId === userID)
    const othersAnswers = answersReordered.filter((answer) => answer.userId !== userID)
    return currentUserAnswer ? [currentUserAnswer, ...othersAnswers] : othersAnswers
  }

  useEffect(() => {
    if (loadingAnswers) return
    if (!dataAnswers) return
    if (!teamUsers) return

    const isUserFromTeam = user?.id && teamUsers.some(({ id }) => id === user.id)
    const isActiveRoutine = isBefore(new Date(), before.setHours(23, 59, 59))
    const haveUserAnswered = dataAnswers?.find(
      (answer) => answer.userId === userID && answer.timestamp,
    )

    setShowAnswerNowButton(
      Boolean(isUserFromTeam && isActiveRoutine && !haveUserAnswered && dataAnswers?.length > 0),
    )
    setFilteredAnswers(reorderAnswers(dataAnswers))
    handleSearch(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAnswers, loadingAnswers, teamUsers, before])

  return {
    search,
    SEARCH_CHARACTERS_LIMIT,
    showAnswerNowButton,
    filteredAnswers,
    loadingSearch,
    dispatchChangeTimePeriod,
    dispatchAnswerNowFormClick,
    isNextWeekDisabled,
    handleSearch,
    setIsRoutineDrawerOpen,
  }
}
