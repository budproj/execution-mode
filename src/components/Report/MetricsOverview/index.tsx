import { Box, Text, Flex, Divider, StyleProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { RadialChartComponent } from 'src/components/Base/Charts'
import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { Team } from 'src/components/Team/types'
import { companyPreposition } from 'src/components/User/DetailedHeader/constants'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { getTeamMetrics } from 'src/state/recoil/routine/get-team-metrics'
import { getRoutineDateRangeDateFormat } from 'src/state/recoil/routine/routine-dates-range'
import { teamAtomFamily } from 'src/state/recoil/team'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import MetricTeamRow from './MetricTeamRow'
import messages from './messages'

interface MetricsOverviewProperties extends StyleProps {}

const MetricsOverview = ({ ...rest }: MetricsOverviewProperties) => {
  const { getEmoji } = useGetEmoji()
  const intl = useIntl()

  const { after, before } = getRoutineDateRangeDateFormat(new Date())
  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))
  const companyId = user?.companies?.edges[0]?.node?.id
  const company = useRecoilValue(teamAtomFamily(companyId))

  const [teams, setTeams] = useConnectionEdges<Team>(company?.rankedDescendants?.edges)

  useEffect(() => {
    setTeams(company?.rankedDescendants?.edges)
  }, [company?.rankedDescendants?.edges, setTeams])

  const answersOverview = getTeamMetrics(company?.id)

  return (
    <Box bg="white" borderRadius="lg" shadow="for-background.light" p={9} pb={4} {...rest}>
      <Flex marginBottom="10px" justifyContent="space-between">
        <Box>
          <Text fontWeight="500" fontSize="18px" color="new-gray.900">
            {intl.formatMessage(messages.metricCardTitle, {
              company: user?.companies?.edges[0].node.name,
              companypreposition: companyPreposition(user?.companies?.edges[0].node.gender),
            })}
          </Text>
          <Text fontWeight="400" fontSize="14px" color="new-gray.700">
            {intl.formatMessage(messages.metricCardSubtitle)}
          </Text>
        </Box>
        <Box marginTop="5px">
          <Text fontWeight="500" fontSize="14px" color="new-gray.900">
            {intl.formatMessage(messages.currentWeekTitle)}
          </Text>
          <Text fontWeight="400" fontSize="14px" color="new-gray.600">
            {format(new Date(after), 'dd/MMM', { locale: pt })} a{' '}
            {format(new Date(before), 'dd/MMM', { locale: pt })}
          </Text>
        </Box>
      </Flex>
      <Divider />
      <Flex marginTop="30px" bg="#F2F6FE" borderRadius="lg" justifyContent="space-between">
        <RadialChartComponent
          size="sm"
          data={
            answersOverview?.overview?.feeling.length > 0
              ? answersOverview?.overview.feeling[0].average
              : 0
          }
          icon={getEmoji({
            felling:
              answersOverview?.overview?.feeling.length > 0
                ? answersOverview?.overview.feeling[0].average
                : 3,
            size: '30px',
          })}
          numberColor="#ffc658"
          progressColor="#ffc658"
          title={intl.formatMessage(messages.feelingRadialChartTitle)}
        />
        <RadialChartComponent
          size="sm"
          data={
            answersOverview?.overview?.productivity.length > 0
              ? answersOverview?.overview?.productivity[0].average
              : 0
          }
          icon={
            <Flex
              background="#4BACF9"
              width="30px"
              height="30px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <SuitcaseIcon
                boxSize="16px"
                desc={intl.formatMessage(messages.productivityIconDescription)}
              />
            </Flex>
          }
          numberColor="#4BACF9"
          progressColor="#4BACF9"
          title={intl.formatMessage(messages.productivityRadialChartTitle)}
        />
        <RadialChartComponent
          percentage
          size="sm"
          data={
            answersOverview?.overview?.roadblock.length > 0
              ? answersOverview?.overview?.roadblock[0].average
              : 0
          }
          icon={
            <Flex
              background="transparent"
              width="30px"
              height="30px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <PauseIcon
                boxSize="35px"
                stroke="white"
                desc={intl.formatMessage(messages.pauseIconDescription)}
              />
            </Flex>
          }
          numberColor="#C26EFF"
          progressColor="#C26EFF"
          title={intl.formatMessage(messages.withBarrierRadialChartTitle)}
        />
      </Flex>
      <Text
        fontWeight="700"
        fontSize="12px"
        color="new-gray.700"
        marginBottom="10px"
        marginTop="25px"
      >
        {intl.formatMessage(messages.byTeamMetricRowTitle)}
      </Text>
      <Divider />
      {teams.map((team) => (
        <MetricTeamRow key={team.id} team={team} />
      ))}
    </Box>
  )
}

export default MetricsOverview
