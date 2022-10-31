import { Flex, Text, IconButton, GridItem, Divider, Box } from '@chakra-ui/react'
import { format, add, sub, isBefore } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import {
  getRoutineDateRangeDateFormat,
  isNextWeekDisabled,
  routineDatesRangeAtom,
} from 'src/state/recoil/routine/routine-dates-range'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import AnswerRowComponent from './answer-row'
import messages from './messages'

interface AnswersComponentProperties {
  answers: AnswerSummary[]
  teamId: string
  after: Date
  before: Date
  week: number
}

interface AnswerSummary {
  id: string
  userId: string
  name: string
  picture: string
  latestStatusReply: string
  timestamp: Date
  commentCount: number
}

const ScrollableItem = getScrollableItem()

const AnswersComponent = ({ answers, teamId, after, before, week }: AnswersComponentProperties) => {
  const { dispatch: dispatchAnswerNowFormClick } = useEvent(EventType.ANSWER_NOW_FORM_CLICK)
  const { dispatch: dispatchChangeTimePeriod } = useEvent(EventType.CHANGE_TIME_PERIOD_CLICK)

  const intl = useIntl()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filteredAnswers, setFilteredAnswers] = useState<AnswerSummary[]>(answers)
  const userID = useRecoilValue(meAtom)
  const [date, setDate] = useRecoilState(routineDatesRangeAtom)
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)
  const user = useRecoilValue(selectUser(userID))
  const [userTeams, updateTeams] = useConnectionEdges(user?.teams?.edges)
  const userTeamIds = userTeams.map((team) => team.id)
  const isUserFromTheTeam = userTeamIds.includes(teamId)

  const haveUserAnswered = answers.find((answer) => answer.userId === userID && answer.timestamp)
  const isActiveRoutine = isBefore(new Date(), before)
  const showAnswerNowButton = Boolean(isUserFromTheTeam && isActiveRoutine && !haveUserAnswered)

  const setNewDate = (newDate: Date) => {
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
  }

  useEffect(() => {
    if (answers) {
      setFilteredAnswers(answers.filter((answer) => answer.name.toLowerCase().includes(search)))
    }
  }, [answers, search])

  useEffect(() => {
    updateTeams(user?.teams?.edges)
  }, [updateTeams, user?.teams])

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
          disabled={isNextWeekDisabled(before)}
          icon={
            <ArrowRight
              desc={intl.formatMessage(messages.arrowRightIconDescription)}
              fill="new-gray.700"
            />
          }
          onClick={() => {
            setNewDate(add(date.after, { weeks: 1 }))
            dispatchChangeTimePeriod({})
          }}
        />
      </Flex>
      <Divider borderColor="new-gray.400" />
      <Flex gap="5px" marginTop="20px" marginBottom="30px">
        <SearchBar placeholder="Buscar" borderRadius="10px" height="38px" onSearch={setSearch} />
      </Flex>
      <ScrollableItem maxH={showAnswerNowButton ? '455px' : '537px'}>
        {filteredAnswers.map((answer) => (
          <AnswerRowComponent key={answer.id} answer={answer} />
        ))}
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
}

export default AnswersComponent
