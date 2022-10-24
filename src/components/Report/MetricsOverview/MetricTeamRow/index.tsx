import { Flex, Text, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { Team } from 'src/components/Team/types'
import { getTeamMetrics } from 'src/state/recoil/routine/get-team-metrics'

import messages from '../messages'

interface MetricTeamRowProperties {
  team?: Partial<Team>
}

const MetricTeamRow = ({ team }: MetricTeamRowProperties) => {
  const { getEmoji } = useGetEmoji()

  const intl = useIntl()

  const answersOverview = getTeamMetrics(team?.id)

  console.log({ answersOverview, team: team?.name })

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingTop="15px"
        paddingBottom="15px"
      >
        <Text color="new-gray.900">{team?.name}</Text>
        <Flex gap="20px">
          <Text
            alignItems="center"
            fontWeight="700"
            fontSize="16px"
            color="yellow.600"
            display="flex"
            gap="5px"
          >
            {getEmoji({
              felling:
                answersOverview?.overview?.feeling.length > 0
                  ? answersOverview?.overview.feeling[0].average
                  : 3,
              size: '20px',
            })}
            {answersOverview?.overview?.feeling.length > 0
              ? answersOverview?.overview.feeling[0].average
              : 0}
          </Text>
          <Text
            alignItems="center"
            fontWeight="700"
            fontSize="16px"
            color="yellow.600"
            display="flex"
            gap="5px"
          >
            <Flex
              background="#4BACF9"
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
            {answersOverview?.overview?.productivity.length > 0
              ? answersOverview?.overview.productivity[0].average
              : 0}
          </Text>
          <Text
            alignItems="center"
            fontWeight="700"
            fontSize="16px"
            color="yellow.600"
            display="flex"
            gap="2px"
          >
            <Flex
              background="transparent"
              width="30px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <PauseIcon
                boxSize="25px"
                stroke="white"
                desc={intl.formatMessage(messages.pauseIconDescription)}
              />
            </Flex>
            {answersOverview?.overview?.roadblock.length > 0
              ? answersOverview?.overview?.roadblock[0].average
              : 0}
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}

export default MetricTeamRow
