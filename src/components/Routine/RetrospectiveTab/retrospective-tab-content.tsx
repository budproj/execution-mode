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
  Link,
} from '@chakra-ui/react'
import { format, parse, differenceInDays } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { CircleArrowRight } from 'src/components/Icon'
import CircleIcon from 'src/components/Icon/Circle'
import GearIcon from 'src/components/Icon/Gear'
import messages from 'src/components/Page/Team/Tabs/content/messages'
import { NotificationSettingsModal } from 'src/components/Routine/NotificationSettings'
import { Team } from 'src/components/Team/types'
import { GraphQLEffect } from 'src/components/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { isAnswerSummaryLoad } from 'src/state/recoil/routine/is-answers-summary-load'
import {
  getRoutineDateRangeDateFormat,
  routineDatesRangeAtom,
} from 'src/state/recoil/routine/routine-dates-range'
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
  isLoading?: boolean
}

export interface AnswerSummary {
  id?: string
  userId: string
  name: string
  picture: string
  latestStatusReply?: string
  timestamp?: Date
  commentCount?: number
}

const RetrospectiveTabContent = ({ teamId, isLoading }: RetrospectiveTabContentProperties) => {
  const intl = useIntl()
  const router = useRouter()
  const { servicesPromise } = useContext(ServicesContext)
  const [answersSummary, setAnswersSummary] = useRecoilState(answerSummaryAtom)
  const [isAnswerSummaryLoaded, setIsAnswerSummaryLoaded] = useRecoilState(isAnswerSummaryLoad)
  const team = useRecoilValue(teamAtomFamily(teamId))
  const canEditTeam = team?.policy?.update === GraphQLEffect.ALLOW
  const { teamOptedOut, toggleDisabledTeam } = useRoutineNotificationSettings(teamId)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleNotifcation = () => {
    toggleDisabledTeam(teamId)
  }

  const [{ after, before, week }, setRoutineDatesRange] = useRecoilState(routineDatesRangeAtom)
  const { after: afterQuery, before: beforeQuery } = router.query
  const afterQueryData = Array.isArray(afterQuery) ? afterQuery[0] : afterQuery
  const beforeQueryData = Array.isArray(beforeQuery) ? beforeQuery[0] : beforeQuery

  const getAnswersSummary = useCallback(async () => {
    const { routines } = await servicesPromise
    setIsAnswerSummaryLoaded(false)
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

    if (answersSummaryData) {
      setAnswersSummary(answersSummaryData)
    }

    setIsAnswerSummaryLoaded(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [after, before, teamId])

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
            {intl.formatMessage(messages.tabRetrospectivePageDescription, {
              link: (
                <Link
                  isExternal
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  ml={1}
                  gap={1}
                  target="_blank"
                  href="https://www.loom.com/share/4e69b3a0269a4b60ab2f4a290c64abae"
                  verticalAlign="middle"
                >
                  {intl.formatMessage(messages.learnMoreRetrospectiveMessage)}
                  <CircleArrowRight
                    alignContent="center"
                    desc={intl.formatMessage(messages.learnMoreRetrospectiveIcon)}
                  />
                </Link>
              ),
            })}
          </Text>
        </Stack>
        {canEditTeam && !isLoading ? (
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
          isLoading={isLoading ?? !isAnswerSummaryLoaded}
          teamId={teamId}
        />
        <Divider orientation="vertical" borderColor="new-gray.400" />
        <RetrospectiveTabContentView
          after={after}
          before={before}
          week={week}
          teamId={teamId}
          isLoaded={!isLoading && isAnswerSummaryLoaded}
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
