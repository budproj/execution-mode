import { Flex, Text, IconButton, GridItem, Divider, Box } from '@chakra-ui/react'
import { format, add, sub } from 'date-fns'
import pt from 'date-fns/locale/pt'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Button } from 'src/components/Base/Button'
import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { ArrowRight } from 'src/components/Icon'
import BrilliantBellIcon from 'src/components/Icon/BrilliantBell'
import { GraphQLEffect } from 'src/components/types'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import {
  isNextWeekDisabled,
  routineDatesRangeAtom,
} from 'src/state/recoil/routine/routine-dates-range'
import { teamAtomFamily } from 'src/state/recoil/team'
import meAtom from 'src/state/recoil/user/me'

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
}

const ScrollableItem = getScrollableItem()

const AnswersComponent = ({ answers, teamId, after, before, week }: AnswersComponentProperties) => {
  const intl = useIntl()
  const [search, setSearch] = useState('')
  const [filteredAnswers, setFilteredAnswers] = useState<AnswerSummary[]>(answers)
  const team = useRecoilValue(teamAtomFamily(teamId))
  const userID = useRecoilValue(meAtom)
  const [date, setDate] = useRecoilState(routineDatesRangeAtom)
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)

  const isUserFromTheTeam = team?.policy?.update === GraphQLEffect.ALLOW
  const haveUserAnswered = answers.find((answer) => answer.userId === userID && answer.timestamp)
  const showAnswerNowButton = Boolean(isUserFromTheTeam && !haveUserAnswered)

  useEffect(() => {
    if (answers) {
      setFilteredAnswers(answers.filter((answer) => answer.name.toLowerCase().includes(search)))
    }
  }, [answers, search])

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
          onClick={() => setDate(sub(date, { weeks: 1 }))}
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
          onClick={() => setDate(add(date, { weeks: 1 }))}
        />
      </Flex>
      <Divider borderColor="new-gray.400" />
      <Flex gap="5px" marginTop="20px" marginBottom="30px">
        <SearchBar placeholder="Buscar" borderRadius="10px" height="38px" onSearch={setSearch} />
      </Flex>
      <ScrollableItem maxH="455px">
        {filteredAnswers.map((answer) => (
          <AnswerRowComponent key={answer.id} teamId={teamId} answer={answer} />
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
            onClick={() => setIsRoutineDrawerOpen(true)}
          />
        </Box>
      )}
    </GridItem>
  )
}

export default AnswersComponent
