import { Flex, Stack, Text, Grid, Divider } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'
import { routineDatesRangeAtom } from 'src/state/recoil/routine/routine-dates-range'

import messages from '../../Page/Team/Tabs/content/messages'

import AnswersComponent from './Answers'
import RoutinesOverview from './RoutinesOverview'

interface RetrospectiveTabContentProperties {
  teamId: Team['id']
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

const RetrospectiveTabContent = ({ teamId }: RetrospectiveTabContentProperties) => {
  const intl = useIntl()
  const router = useRouter()
  const { servicesPromise } = useContext(ServicesContext)
  const [answersSummary, setAnswersSummary] = useState<AnswerSummary[]>([])
  const [answersOverview, setAnswersOverview] = useState<AnswerOverview | undefined>()

  const { after, before, week } = useRecoilValue(routineDatesRangeAtom)

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
      <Flex alignItems="center" justifyContent="space-between">
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
        <RoutinesOverview after={after} before={before} week={week} data={answersOverview} />
      </Grid>
    </Stack>
  )
}

export default RetrospectiveTabContent
