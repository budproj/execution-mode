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
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import CircleIcon from 'src/components/Icon/Circle'
import GearIcon from 'src/components/Icon/Gear'
import messages from 'src/components/Page/Team/Tabs/content/messages'
import { NotificationSettingsModal } from 'src/components/Routine/NotificationSettings'
import { Team } from 'src/components/Team/types'
import { GraphQLEffect } from 'src/components/types'
import { routineDatesRangeAtom } from 'src/state/recoil/routine/routine-dates-range'
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

const RetrospectiveTabContent = ({ teamId, answerQuery }: RetrospectiveTabContentProperties) => {
  const intl = useIntl()
  const router = useRouter()
  const { servicesPromise } = useContext(ServicesContext)
  const [answersSummary, setAnswersSummary] = useState<AnswerSummary[]>([])
  const team = useRecoilValue(teamAtomFamily(teamId))
  const canEditTeam = team?.policy?.update === GraphQLEffect.ALLOW
  const { teamOptedOut, toggleDisabledTeam } = useRoutineNotificationSettings(teamId)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleNotifcation = () => {
    toggleDisabledTeam(teamId)
  }

  const { after, before, week } = useRecoilValue(routineDatesRangeAtom)

  const getAnswersSummary = useCallback(async () => {
    if (before && after) {
      const { routines } = await servicesPromise
      const { data: answersSummaryData } = await routines.get<AnswerSummary[]>(
        `/answers/summary/${teamId}`,
        {
          params: {
            before,
            after,
            includeSubteams: false,
          },
        },
      )

      if (answersSummaryData) setAnswersSummary(answersSummaryData)
    }
  }, [after, before, teamId, servicesPromise])

  useEffect(() => {
    getAnswersSummary()
  }, [getAnswersSummary])

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
