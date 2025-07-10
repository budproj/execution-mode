/* eslint-disable import/order */
import { useEffect, useState } from 'react'
import { format, parse, differenceInDays } from 'date-fns'
import { useRecoilState, useRecoilValue } from 'recoil'

import { GraphQLEffect } from 'src/components/types'

import { teamAtomFamily } from 'src/state/recoil/team'
import {
  getRoutineDateRangeDateFormat,
  routineDatesRangeAtom,
} from 'src/state/recoil/routine/routine-dates-range'

import { useAnswerSummaryPagination } from '../hooks/useAnswerSummaryPagination'
import { useGetAnswersMutation } from '../hooks/new/use-get-answers'
import { NextRouter } from 'next/router'
import { useNotificationSettings } from '../hooks/new/use-get-notifications-settings'
import { filteredUsersCompany, selectUserFromCompany } from 'src/state/recoil/team/users-company'
import meAtom from 'src/state/recoil/user/me'

export const formatUUIDArray = (uuids: string[]) => {
  return "['" + uuids.join("', '") + "']"
}

export const useLogic = (teamId: string, router: NextRouter) => {
  // Local const
  const REQUEST_LIMIT = 10

  // Local states
  const [usersSelected, setUsersSelected] = useState<string[]>([])

  // Global states
  const [{ after, before, week }, setRoutineDatesRange] = useRecoilState(routineDatesRangeAtom)
  const team = useRecoilValue(teamAtomFamily(teamId))
  const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
  const userID = useRecoilValue(meAtom)
  const me = useRecoilValue(selectUserFromCompany(userID))

  // Permission
  const canEditTeam = team?.policy?.update === GraphQLEffect.ALLOW

  // Hooks
  const { teamOptedOut, toggleDisabledTeam } = useNotificationSettings(teamId)
  const { limitedTeamUsers } = useAnswerSummaryPagination(teamId, usersSelected)

  const {
    data: dataAnswers,
    isLoading: loadingAnswers,
    refetch: refetchAnswers,
  } = useGetAnswersMutation({
    teamId,
    after,
    before,
    teamUsersIds: usersSelected,
  })

  const toggleNotifcation = () => {
    toggleDisabledTeam(teamId)
  }

  const updateUsers = () => {
    const isUserFromTeam = me?.id && teamUsers.some(({ id }) => id === me.id)
    const companyUsersWithMe = isUserFromTeam
      ? [me, ...teamUsers.filter(({ id }) => id !== me?.id)]
      : teamUsers
    const filteredTeamUsers = companyUsersWithMe.filter((user) => !usersSelected.includes(user.id))
    const limitedTeamUsers = filteredTeamUsers.slice(0, REQUEST_LIMIT)
    return limitedTeamUsers.map((item) => item.id)
  }

  const handleViewMore = () => {
    const teamUsersIds = updateUsers()
    setUsersSelected((previousAnswers) => [
      ...previousAnswers,
      ...teamUsersIds.filter((item) => !previousAnswers.includes(item)),
    ])
  }

  const setNewDate = async (newDate: Date) => {
    const dateRange = getRoutineDateRangeDateFormat(newDate)

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

    await refetchAnswers()
  }

  useEffect(() => {
    if (!me) return
    handleViewMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamUsers, me])

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
    const { after: afterQuery, before: beforeQuery } = router.query
    const afterQueryData = Array.isArray(afterQuery) ? afterQuery[0] : afterQuery
    const beforeQueryData = Array.isArray(beforeQuery) ? beforeQuery[0] : beforeQuery

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
  }, [router.query])

  return {
    loadingAnswers,
    limitedTeamUsers,
    dataAnswers,
    canEditTeam,
    teamOptedOut,
    after,
    before,
    week,
    usersSelected,
    toggleNotifcation,
    setNewDate,
    handleViewMore,
    setUsersSelected,
  }
}
