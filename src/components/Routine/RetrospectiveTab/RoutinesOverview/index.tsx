import { Box, Divider, Flex, GridItem, Text } from '@chakra-ui/react'
import { addMinutes, format, isSameDay, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import React, { useCallback, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { overviewDataAtom } from 'src/state/recoil/routine/overview-data'

import { AreaRadialChart } from '../../../Base/Charts'

import messages from './messages'

export interface AverageData {
  timestamp: string
  average: number
  total?: number
}

export interface OverviewData {
  overview?: {
    feeling: AverageData[]
    productivity: AverageData[]
    roadblock: AverageData[]
  }
}

export interface RoutinesOverviewProperties {
  teamId: string
  after: Date
  before: Date
  week: number
  isLoaded?: boolean
}

function formatDate(date: Date) {
  return parseISO(format(addMinutes(date, date.getTimezoneOffset()), 'yyyy-MM-dd HH:mm:ss'))
}

export const getCurrentDataByTimeStamp = (data: AverageData[], timestamp: string) => {
  return data.findIndex((data) =>
    isSameDay(formatDate(parseISO(data.timestamp)), parseISO(timestamp)),
  )
}

const RoutinesOverview = ({
  teamId,
  after,
  before,
  week,
  isLoaded,
}: RoutinesOverviewProperties) => {
  const intl = useIntl()
  const { getEmoji } = useGetEmoji()
  const { servicesPromise } = useContext(ServicesContext)
  const [answersOverview, setAnswersOverview] = useRecoilState(overviewDataAtom)

  const getAnswersOverview = useCallback(async () => {
    const { routines } = await servicesPromise
    const { data: answersOverview } = await routines.get<OverviewData>(
      `/answers/overview/${teamId}`,
      {
        params: { includeSubteams: false },
      },
    )

    if (answersOverview) {
      setAnswersOverview(answersOverview)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getAnswersOverview()
  }, [getAnswersOverview])

  const activeDataIndex = getCurrentDataByTimeStamp(
    answersOverview?.overview?.feeling ?? [],
    after.toISOString(),
  )

  return (
    <GridItem marginTop="31px" paddingX="30px">
      <Box>
        <Flex>
          <Text color="new-gray.900" fontSize="28px" fontWeight="500">
            {intl.formatMessage(messages.teamOverviewTitle)}
          </Text>
          <Box marginLeft="auto" textAlign="right">
            <Text color="new-gray.800" fontSize="18px" fontWeight="500">
              {intl.formatMessage(messages.weekText)} {week}
            </Text>
            <Text color="new-gray.600" fontSize="16px" fontWeight="450">
              {format(new Date(after), 'dd/MMM', { locale: pt })} a{' '}
              {format(new Date(before), 'dd/MMM', { locale: pt })}
            </Text>
          </Box>
        </Flex>

        <Divider marginY="13px" borderColor="new-gray.400" />

        <AreaRadialChart
          label={intl.formatMessage(messages.feelingGraphTitle)}
          areaStartColor="#FFD964E5"
          areaEndColor="#FFD964E5"
          strokeLineColor="#F1BF25"
          icon={getEmoji({
            felling: answersOverview?.overview?.feeling[activeDataIndex]?.average ?? 5,
            size: '50px',
          })}
          numberColor="#ffc658"
          progressColor="#ffc658"
          highLightIndex={activeDataIndex}
          data={answersOverview?.overview?.feeling}
          isLoaded={isLoaded}
        />
        <AreaRadialChart
          label={intl.formatMessage(messages.productivityGraphTitle)}
          strokeLineColor="#4BACF9"
          areaEndColor="#4BACF9B2"
          areaStartColor="#4BACF9B2"
          highLightIndex={activeDataIndex}
          data={answersOverview?.overview?.productivity}
          icon={
            <Flex
              background="#4BACF9"
              width="50px"
              height="50px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <SuitcaseIcon
                boxSize="23px"
                desc={intl.formatMessage(messages.productivtyIconDescription)}
              />
            </Flex>
          }
          numberColor="#4BACF9"
          progressColor="#4BACF9"
          isLoaded={isLoaded}
        />
        {/* <AreaRadialChart
          label="CLAREZA DE ESTRATÉGIA"
          areaStartColor="#6F6EFF"
          areaEndColor="#8C8BFF26"
          strokeLineColor="#6F6EFF"
          icon={
            <Flex
              background="#6F6EFF"
              width="50px"
              height="50px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <MountainIcon boxSize="23px" desc="mudar" />
            </Flex>
          }
          numberColor="#6F6EFF"
          progressColor="#6F6EFF"
        /> */}
      </Box>
    </GridItem>
  )
}

export default RoutinesOverview
