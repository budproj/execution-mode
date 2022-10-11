import {
  Flex,
  Stack,
  Text,
  Grid,
  Divider,
  ButtonGroup,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import CircleIcon from 'src/components/Icon/Circle'
import GearIcon from 'src/components/Icon/Gear'
import messages from 'src/components/Page/Team/Tabs/content/messages'
import { NotificationSettingsModal } from 'src/components/Routine/NotificationSettings'
import { Team } from 'src/components/Team/types'
import { GraphQLEffect } from 'src/components/types'
import { routineDateRangeSelector } from 'src/state/recoil/routine/routine-dates-range'
import { teamAtomFamily } from 'src/state/recoil/team'

import { useRoutineNotificationSettings } from '../hooks/getRoutineNotificationSettings'

import AnswersComponent from './Answers'
import RetrospectiveTabContentView from './retrospective-tab-content-view'

export type AnswerType = {
  id: string
  user: string
  feeling: number
  createdAt: string
  comments: number
}

interface RetrospectiveTabContent {
  teamId: Team['id']
  answerQuery: string
}

interface RetrospectiveTabContentProperties {
  teamId: Team['id']
  answerQuery: string
}

interface AnswerSummary {
  id: string
  userId: string
  name: string
  picture: string
  latestStatusReply: string
  timestamp: Date
}

interface AnswerOverview {
  overview: {
    feeling: Array<{ timestamp: string; average: number }>
    productivity: Array<{ timestamp: string; average: number }>
  }
}

const RetrospectiveTabContent = ({ teamId, answerQuery }: RetrospectiveTabContentProperties) => {
  const intl = useIntl()
  const { servicesPromise } = useContext(ServicesContext)
  const [answersSummary, setAnswersSummary] = useState<AnswerSummary[]>([])
  const [answersOverview, setAnswersOverview] = useState<AnswerOverview | undefined>()
  const team = useRecoilValue(teamAtomFamily(teamId))
  const { teamOptedOut, toggleDisabledTeam } = useRoutineNotificationSettings(teamId)

  const { after, before, week } = useRecoilValue(routineDateRangeSelector)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const canEditTeam = team?.policy?.update === GraphQLEffect.ALLOW

  const toggleNotifcation = () => {
    toggleDisabledTeam(teamId)
  }

  useEffect(() => {
    const getAnswersSummaryAndOverview = async () => {
      const { routines } = await servicesPromise

      const [{ data: answersSummaryData }, { data: answersOverview }] = await Promise.all([
        routines.get<AnswerSummary[]>(`/answers/summary/${teamId ?? teamId}`, {
          params: { before, after, includeSubteams: false },
        }),
        routines.get<AnswerOverview>(`/answers/overview/${teamId ?? teamId}`, {
          params: { includeSubteams: false },
        }),
      ])

      if (answersSummaryData) setAnswersSummary(answersSummaryData)
      if (answersOverview) setAnswersOverview(answersOverview)
    }

    getAnswersSummaryAndOverview()
  }, [after, before, servicesPromise, teamId])

  return (
    <Stack spacing={10}>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <Stack direction="column" spacing={1}>
          <Text fontSize={28} fontWeight="medium" color="new-gray.800">
            {intl.formatMessage(messages.tabRetrospectivePageTitle)}
          </Text>
          <Text
            fontSize={14}
            color="new-gray.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {intl.formatMessage(messages.tabRetrospectivePageDescription)}
          </Text>
        </Stack>
        {canEditTeam ? (
          <Stack>
            <ButtonGroup isAttached size="sm" variant="outline" onClick={onOpen}>
              <Button
                borderTopLeftRadius="10px"
                borderBottomLeftRadius="10px"
                bgColor="#fff"
                borderColor="new-gray.400"
                borderWidth="1px"
                fontSize="14px"
                _hover={{}}
                _focus={{}}
              >
                <CircleIcon desc="teste" fill={teamOptedOut ? 'red.500' : 'green.500'} mr={3} />
                {intl.formatMessage(
                  teamOptedOut ? messages.routineSettingsInactive : messages.routineSettingsActive,
                )}
              </Button>
              <IconButton
                borderColor="new-gray.400"
                borderWidth="1px"
                borderLeft={0}
                aria-label={intl.formatMessage(messages.routineSettingsButton)}
                bgColor="#fff"
                borderTopRightRadius="10px"
                borderBottomRightRadius="10px"
                _hover={{ backgroundColor: 'initial' }}
                _active={{ backgroundColor: 'initial' }}
                _focus={{}}
                icon={<GearIcon fill="gray.500" w="16px" h="auto" desc="teste" mx={3} />}
              />
            </ButtonGroup>
          </Stack>
        ) : undefined}
      </Flex>
      <Grid w="100%" templateColumns="370px 0px 1fr" minHeight="750px" bg="white" borderRadius={15}>
        <AnswersComponent
          after={after}
          before={before}
          week={week}
          answers={answersSummary}
          teamId={teamId}
        />
        <Divider orientation="vertical" borderColor="new-gray.400" />
        <RetrospectiveTabContentView
          after={after}
          before={before}
          week={week}
          data={answersOverview}
          answerQuery={answerQuery}
          teamId={teamId}
        />
      </Grid>

      <NotificationSettingsModal
        isOpen={isOpen}
        teamOptedOut={teamOptedOut}
        onClose={onClose}
        onToggle={toggleNotifcation}
      />
    </Stack>
  )
}

export default RetrospectiveTabContent
