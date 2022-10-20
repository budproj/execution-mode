import { Box, Text, Flex, Divider, StyleProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { RadialChartComponent } from 'src/components/Base/Charts'
import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'

import MetricTeamRow from './MetricTeamRow'
import messages from './messages'

interface MetricsOverviewProperties extends StyleProps {}

const MetricsOverview = ({ ...rest }: MetricsOverviewProperties) => {
  const { getEmoji } = useGetEmoji()
  const intl = useIntl()
  return (
    <Box bg="white" borderRadius="lg" shadow="for-background.light" p={9} pb={4} {...rest}>
      <Flex marginBottom="10px" justifyContent="space-between">
        <Box>
          <Text fontWeight="500" fontSize="18px" color="new-gray.900">
            {intl.formatMessage(messages.metricCardTitle, { company: 'Bud' })}
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
            18/jul a 24/jul
          </Text>
        </Box>
      </Flex>
      <Divider />
      <Flex marginTop="30px" bg="#F2F6FE" borderRadius="lg" justifyContent="space-between">
        <RadialChartComponent
          size="sm"
          data={4.5}
          icon={getEmoji({
            felling: 5,
            size: '30px',
          })}
          numberColor="#ffc658"
          progressColor="#ffc658"
          title={intl.formatMessage(messages.feelingRadialChartTitle)}
        />
        <RadialChartComponent
          size="sm"
          data={4.5}
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
          data={30}
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
      <MetricTeamRow team={{ name: 'Produto' }} />
      <MetricTeamRow team={{ name: 'Financeiro' }} />
      <MetricTeamRow team={{ name: 'Marketing' }} />
    </Box>
  )
}

export default MetricsOverview
