import { Flex, Text, IconButton, GridItem, Divider, Box, Spinner } from '@chakra-ui/react'
import { format, add, sub, isBefore } from 'date-fns'
import pt from 'date-fns/locale/pt'
import debounce from 'lodash/debounce'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Button } from 'src/components/Base/Button'
import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { ArrowRight } from 'src/components/Icon'
import BrilliantBellIcon from 'src/components/Icon/BrilliantBell'
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

import { useFetchSummaryData } from '../../hooks/useFetchSummaryData'

import AnswerRowComponent from './answer-row'
import messages from './messages'

interface AnswersComponentProperties {
  teamId: string
  onGetNoCurrentAnswers: (after: Date, before: Date) => Promise<void>
  after: Date
  before: Date
  week: number
}

const ScrollableItem = getScrollableItem()

const SEARCH_CHARACTERS_LIMIT = 3

const AnswersComponent = memo(
  ({ teamId, after, before, week, onGetNoCurrentAnswers }: AnswersComponentProperties) => {
    const { dispatch: dispatchAnswerNowFormClick } = useEvent(EventType.ANSWER_NOW_FORM_CLICK)
    const { dispatch: dispatchChangeTimePeriod } = useEvent(EventType.CHANGE_TIME_PERIOD_CLICK)
    const [isAnswerSummaryLoading, setIsAnswerSummaryLoading] = useRecoilState(
      answerSummaryLoadStateAtom,
    )

    const { fetchAnswers } = useFetchSummaryData()

    const teamUsers = useRecoilValue(filteredUsersCompany(teamId))
    const [answersSummary, setAnswersSummary] = useRecoilState(answerSummaryAtom)
    const [search, setSearch] = useState('')

    const filteredAnswers = useMemo(() => {
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
    }, [answersSummary, search])

    const intl = useIntl()
    const router = useRouter()

    const userID = useRecoilValue(meAtom)
    const [date, setDate] = useRecoilState(routineDatesRangeAtom)
    const setIsAnswerSummaryLoaded = useSetRecoilState(isAnswerSummaryLoad)
    const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)
    const user = useRecoilValue(selectUser(userID))
    const [userTeams, updateTeams] = useConnectionEdges(user?.teams?.edges)
    const [userCompanies, updateUserCompanies] = useConnectionEdges(user?.companies?.edges)
    const userTeamIds = userTeams.map((team) => team.id)
    const userCompanie = userCompanies[0]?.id
    const isUserFromTheTeam = [...userTeamIds, userCompanie].includes(teamId)

    const haveUserAnswered = answersSummary.find(
      (answer) => answer.userId === userID && answer.timestamp,
    )
    const isActiveRoutine = isBefore(new Date(), before)

    const showAnswerNowButton = Boolean(
      isUserFromTheTeam && isActiveRoutine && !haveUserAnswered && answersSummary.length > 0,
    )

    const setNewDate = useCallback(
      async (newDate: Date) => {
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
      },
      [onGetNoCurrentAnswers, router, setDate],
    )

    const performDebounced = useCallback(
      async (searchTerm: string) => {
        console.log('\n\n\n Search Term: %s \n\n\n', searchTerm)
        const usersSearched = teamUsers.filter((user) =>
          user.fullName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
        )

        const teamUsersIds = usersSearched.map((user) => user.id)

        const usersAreBeingRequestedForTheFirstTime = !teamUsersIds.some((userId) => {
          return answersSummary.some((user) => user.userId === userId)
        })

        if (usersAreBeingRequestedForTheFirstTime && teamUsersIds.length > 0) {
          const searchDataFormatted = await fetchAnswers({ teamId, after, before, teamUsersIds })

          if (searchDataFormatted)
            setAnswersSummary((previousAnswers) => [...previousAnswers, ...searchDataFormatted])
        }

        setIsAnswerSummaryLoading(false)
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [after, before, teamUsers],
    )

    const debouncedSearch = debounce(performDebounced, 2500)

    const handleSearch = useCallback(
      async (value: string) => {
        if (value.length >= SEARCH_CHARACTERS_LIMIT) {
          setSearch(value)
          setIsAnswerSummaryLoading(true)
          await debouncedSearch(value)
        } else {
          setIsAnswerSummaryLoading(false)
          setSearch('')
        }
      },
      [debouncedSearch, setIsAnswerSummaryLoading],
    )

    useEffect(() => {
      updateTeams(user?.teams?.edges)
      updateUserCompanies(user?.companies?.edges)
    }, [updateTeams, updateUserCompanies, user?.companies?.edges, user?.teams])

    return (
      <GridItem padding="25px 25px 30px 20px" display="flex" flexDirection="column">
        <Flex width="100%" height="38px" marginBottom="25px" marginTop="6px">
          <IconButton
            background="new-gray.200"
            aria-label={intl.formatMessage(messages.arrowLeftIconDescription)}
            borderRadius="10px 0px 0px 10px"
            height="38px"
            icon={
              <ArrowRight
                transform="rotate(180deg)"
                desc={intl.formatMessage(messages.arrowLeftIconDescription)}
                fill="new-gray.700"
              />
            }
            onClick={() => {
              setIsAnswerSummaryLoaded(false)
              setNewDate(sub(date.after, { weeks: 1 }))
              dispatchChangeTimePeriod({})
            }}
          />
          <Text
            color="new-gray.800"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            background="new-gray.100"
            marginX="3px"
          >
            {intl.formatMessage(messages.weekText)} {week} (
            {format(new Date(after), 'dd/MMM', { locale: pt })} a{' '}
            {format(new Date(before), 'dd/MMM', { locale: pt })})
          </Text>
          <IconButton
            borderRadius="0px 10px 10px 0px"
            background="new-gray.200"
            aria-label={intl.formatMessage(messages.arrowRightIconDescription)}
            height="38px"
            isDisabled={isNextWeekDisabled(before)}
            icon={
              <ArrowRight
                desc={intl.formatMessage(messages.arrowRightIconDescription)}
                fill="new-gray.700"
              />
            }
            onClick={() => {
              setIsAnswerSummaryLoaded(false)
              setNewDate(add(date.after, { weeks: 1 }))
              dispatchChangeTimePeriod({})
            }}
          />
        </Flex>
        <Divider borderColor="new-gray.400" />
        <Flex gap="5px" marginTop="20px" marginBottom="30px">
          <SearchBar
            placeholder="Buscar"
            borderRadius="10px"
            height="38px"
            onSearch={handleSearch}
          />
        </Flex>
        <ScrollableItem
          id="scrollable-list-users"
          maxH={showAnswerNowButton ? '455px' : '537px'}
          p="0 12px"
        >
          {filteredAnswers.map((answer) => (
            <AnswerRowComponent key={answer.id} answer={answer} />
          ))}
          {isAnswerSummaryLoading && (
            <Flex justify="center" py={4}>
              <Spinner size="lg" />
            </Flex>
          )}
          <Box
            id="list-bottom"
            display={search.length >= SEARCH_CHARACTERS_LIMIT ? 'hidden' : 'block'}
          />
        </ScrollableItem>
        {showAnswerNowButton && (
          <Box textAlign="center" marginTop="auto">
            <Divider borderColor="new-gray.400" />
            <Text color="red.500" fontWeight="500" fontSize="14px" marginY="10px">
              <BrilliantBellIcon
                desc={intl.formatMessage(messages.redBellIconDescription)}
                marginRight={2}
                marginBottom={1.5}
              />
              {intl.formatMessage(messages.notAnsweredText)}
            </Text>
            <Button
              width="100%"
              label={intl.formatMessage(messages.answerNowButton)}
              color="white"
              backgroundColor="brand.500"
              padding="13px 0px"
              _hover={{ background: 'brand.400', color: 'black.50' }}
              onClick={() => {
                setIsRoutineDrawerOpen(true)
                dispatchAnswerNowFormClick({})
              }}
            />
          </Box>
        )}
      </GridItem>
    )
  },
)

export default AnswersComponent
