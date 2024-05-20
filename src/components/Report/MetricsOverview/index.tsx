import { Box, Button, Text, Flex, Divider, StyleProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { RadialChartComponent } from 'src/components/Base/Charts'
import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { CardHeader } from 'src/components/Report/CardHeaders'
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

const ScrollableItem = getScrollableItem()

const MetricsOverview = ({ ...rest }: MetricsOverviewProperties) => {
  const [index, setIndex] = useState(5)
  const { getEmoji } = useGetEmoji()
  const intl = useIntl()

  const { after, before } = getRoutineDateRangeDateFormat(new Date())
  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))
  const companyId = user?.companies?.edges[0]?.node?.id
  const company = useRecoilValue(teamAtomFamily(companyId))

  const [teams, setTeams] = useConnectionEdges<Team>(company?.rankedDescendants?.edges)
  const teamsToRender = teams.slice(0, index)
  useEffect(() => {
    setTeams(company?.rankedDescendants?.edges)
  }, [company?.rankedDescendants?.edges, setTeams])

  const routinesOverview = getTeamMetrics(company?.id)
  const overviewData = routinesOverview.overview
    ? routinesOverview.overview
    : {
        feeling: [],
        productivity: [],
        roadblock: [],
      }

  const { feeling, productivity, roadblock } = overviewData

  return (
    <Box bg="white" borderRadius="lg" shadow="for-background.light" px={8} py={5} {...rest}>
      <CardHeader
        loading={teamsToRender.length === 0}
        title={intl.formatMessage(messages.metricCardTitle, {
          company: user?.companies?.edges[0].node.name,
          companypreposition: companyPreposition(user?.companies?.edges[0].node.gender),
        })}
        subtitle={intl.formatMessage(messages.metricCardSubtitle)}
      >
        <Box textAlign="right">
          <Text fontWeight="500" fontSize="14px" color="new-gray.900">
            {intl.formatMessage(messages.currentWeekTitle)}
          </Text>
          <Text fontWeight="400" fontSize="14px" color="new-gray.600">
            {intl.formatDateTimeRange(new Date(after), new Date(before), {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </Box>
      </CardHeader>
      <Divider />
      <Flex marginTop="30px" bg="#F2F6FE" borderRadius="lg" justifyContent="space-between">
        <RadialChartComponent
          size="sm"
          data={feeling.length > 0 ? feeling[0].average : 0}
          icon={getEmoji({
            felling: feeling.length > 0 ? feeling[0].average : 3,
            size: '30px',
          })}
          numberColor="#ffc658"
          progressColor="#ffc658"
          title={intl.formatMessage(messages.feelingRadialChartTitle)}
        />
        <RadialChartComponent
          size="sm"
          data={productivity.length > 0 ? productivity[0].average : 0}
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
          data={Number(
            (roadblock.length > 0
              ? (roadblock[0].average / (roadblock[0]?.total ?? 1)) * 100
              : 0
            ).toFixed(1),
          )}
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
                circleStrokeWidth={0}
                fill="#F53D7A"
                desc={intl.formatMessage(messages.pauseIconDescription)}
              />
            </Flex>
          }
          numberColor="#F53D7A"
          progressColor="#F53D7A"
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
      <ScrollableItem maxHeight="185px" p="0 12px">
        {teamsToRender.map((team) => (
          <MetricTeamRow key={team.id} team={team} />
        ))}
        <Box style={{ display: 'flex' }}>
          {index < teams.length && (
            <Button
              _hover={{
                color: 'brand.500',
              }}
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                setIndex(index + 5)
              }}
            >
              {intl.formatMessage(messages.loadMore)}
            </Button>
          )}
        </Box>
      </ScrollableItem>
    </Box>
  )
}

export default MetricsOverview
