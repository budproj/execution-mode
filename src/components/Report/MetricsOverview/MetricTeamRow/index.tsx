import { Flex, Text, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import IntlLink from 'src/components/Base/IntlLink'
import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { Team } from 'src/components/Team/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { getTeamMetrics } from 'src/state/recoil/routine/get-team-metrics'

import messages from '../messages'

interface MetricTeamRowProperties {
  team?: Partial<Team>
}

const MetricTeamRow = ({ team }: MetricTeamRowProperties) => {
  const { dispatch } = useEvent(EventType.METRIC_TEAM_ROW_CLICK)
  const { getEmoji } = useGetEmoji()
  const intl = useIntl()
  const {
    overview: { feeling, productivity, roadblock },
  } = getTeamMetrics(team?.id)

  const teamLink = `/explore/${team?.id ?? ''}?activeTab=retrospectiva`

  return (
    <IntlLink href={teamLink}>
      <>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          paddingTop="15px"
          paddingBottom="15px"
          onClick={() => dispatch({ teamId: team?.id })}
        >
          <Text color="new-gray.900">{team?.name}</Text>
          <Flex gap="20px" width="180px" justifyContent="space-between">
            <Text
              alignItems="center"
              fontWeight="700"
              fontSize="16px"
              color="yellow.600"
              display="flex"
              gap="5px"
            >
              {getEmoji({
                felling: feeling.length > 0 ? feeling[0].average : 3,
                size: '20px',
              })}
              {feeling.length > 0 ? feeling[0].average : 0}
            </Text>
            <Text
              alignItems="center"
              fontWeight="700"
              fontSize="16px"
              color="blue.400"
              display="flex"
              gap="5px"
            >
              <Flex
                background="blue.400"
                width="20px"
                height="20px"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
              >
                <SuitcaseIcon
                  boxSize="10px"
                  desc={intl.formatMessage(messages.productivityIconDescription)}
                />
              </Flex>
              {productivity.length > 0 ? productivity[0].average : 0}
            </Text>
            <Text
              alignItems="center"
              fontWeight="700"
              fontSize="16px"
              color="purple.500"
              display="flex"
              gap="2px"
            >
              <PauseIcon
                boxSize="25px"
                stroke="white"
                circleStrokeWidth={0}
                desc={intl.formatMessage(messages.pauseIconDescription)}
              />
              {roadblock.length > 0 ? roadblock[0].average : 0}
            </Text>
          </Flex>
        </Flex>
        <Divider />
      </>
    </IntlLink>
  )
}

export default MetricTeamRow
