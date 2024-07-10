import { Flex, Box, Heading, Text, StyleProps, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PercentageProgressIncreaseTag } from 'src/components/Base'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import SliderWithDetails from 'src/components/Base/SliderWithDetails'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { Cycle } from 'src/components/Cycle/types'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import { useGetProjectedProgress } from 'src/components/Team/hooks'
import { Team } from 'src/components/Team/types'

import { OverviewSummaryEmptyState } from './empty'
import messages from './messages'
import { OverviewSummarySkeleton } from './skeleton'

interface OverviewSummaryProperties extends StyleProps {
  title: string
  isLoading?: boolean
  cycle?: Cycle | undefined
  team?: Partial<Team> | undefined
}

export const OverviewSummary = ({
  title,
  isLoading,
  cycle,
  team,
  ...rest
}: OverviewSummaryProperties) => {
  const intl = useIntl()

  const isTeam = Boolean(team)

  const { percentualProjectedProgress } = useGetProjectedProgress({
    dateStart: isTeam ? team?.tacticalCycle?.dateStart : cycle?.dateStart,
    dateEnd: isTeam ? team?.tacticalCycle?.dateEnd : cycle?.dateEnd,
  })

  if (team)
    return (
      <OverviewSummaryTeam
        isLoading={isLoading}
        title={title}
        cycle={cycle}
        team={team}
        isTeam={isTeam}
        percentualProjectedProgress={percentualProjectedProgress}
        {...rest}
      />
    )

  const progress = cycle?.status?.progress ?? 0
  const deltaProgress = cycle?.delta?.progress ?? 0
  const latestCheckIn = cycle?.status?.latestCheckIn
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined

  const updateTextColor = cycle?.status?.isOutdated ? 'red.500' : 'new-gray.600'
  const prefixMessage = cycle?.status?.isOutdated
    ? messages.outdatedUpdateTextPrefix
    : messages.lastUpdateTextPrefix

  return (
    <Box p={9} bg="white" shadow="for-background.light" borderRadius="lg" {...rest}>
      {isLoading ? (
        <OverviewSummarySkeleton />
      ) : cycle ? (
        <Stack justifyContent="space-between" height="100%">
          <Flex justifyContent="space-between">
            <Box>
              <Flex alignItems="center">
                <Heading size="lg">{title}</Heading>

                <TooltipWithDelay label={intl.formatMessage(messages.accumulatedProgressTooltip)}>
                  <Box>
                    <PercentageProgressIncreaseTag
                      forcePositiveSignal
                      showSignalArrow
                      value={deltaProgress}
                      fontSize="sm"
                      p={2}
                      gridGap={1}
                      ml={6}
                    />
                  </Box>
                </TooltipWithDelay>
              </Flex>

              <LastUpdateText
                date={lastUpdateDate}
                author={latestCheckIn?.user?.fullName}
                color={updateTextColor}
                fontSize="1rem"
                prefix={intl.formatMessage(prefixMessage)}
                mt={2}
              />
            </Box>

            <Box>
              <Text
                fontSize="5xl"
                fontWeight={600}
                lineHeight={0.7}
                color="brand.500"
                textAlign="right"
              >
                {progress.toFixed() ?? '-'}%
              </Text>
              <Flex alignItems="center" justifyContent="flex-end" mt={3}>
                <Text color="new-gray.600" mr={1}>
                  {intl.formatMessage(messages.projectProgress, {
                    progress: percentualProjectedProgress.toFixed(),
                  })}
                </Text>
                <TooltipWithDelay
                  label={intl.formatMessage(messages.projectProgressTooltip, {
                    progress: percentualProjectedProgress.toFixed(),
                  })}
                  placement="bottom-start"
                  maxWidth="470px"
                >
                  <Flex transform="translateY(-1px)">
                    <InfoCircleIcon
                      fill="new-gray.600"
                      stroke="new-gray.600"
                      desc={intl.formatMessage(messages.projectProgressTooltip, {
                        progress: percentualProjectedProgress.toFixed(),
                      })}
                      cursor="help"
                    />
                  </Flex>
                </TooltipWithDelay>
              </Flex>
            </Box>
          </Flex>

          <Box position="relative" mt={3}>
            <SliderWithDetails
              value={progress}
              projectedProgress={percentualProjectedProgress}
              trackThickness={4}
              thumbWeight="5px"
              thumbHeight={8}
              showSliderDetails={false}
              showThumb={false}
              mt={4}
              thumbColor="new-gray.600"
            />
          </Box>
        </Stack>
      ) : (
        <OverviewSummaryEmptyState title={title} />
      )}
    </Box>
  )
}

interface OverviewSummmaryTeamProperties extends StyleProps {
  title: string
  percentualProjectedProgress: number
  isLoading?: boolean
  team?: Partial<Team>
  isTeam: boolean
  cycle?: Cycle
}

const OverviewSummaryTeam = ({
  isLoading,
  percentualProjectedProgress,
  title,
  cycle,
  team,
  isTeam,
  ...rest
}: OverviewSummmaryTeamProperties) => {
  const intl = useIntl()

  const latestCheckIn = team?.status?.latestCheckIn
  const progress = team?.progressWithChildren ?? 0
  const deltaProgress = team?.delta?.progress ?? 0
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined

  const updateTextColor = cycle?.status?.isOutdated ? 'red.500' : 'new-gray.600'
  const prefixMessage = cycle?.status?.isOutdated
    ? messages.outdatedUpdateTextPrefix
    : messages.lastUpdateTextPrefix

  return (
    <Box p={9} bg="white" shadow="for-background.light" borderRadius="lg" {...rest}>
      {isLoading ? (
        <OverviewSummarySkeleton />
      ) : team ? (
        <Stack justifyContent="space-between" position="relative">
          <Flex>
            <Box maxW="calc(100% - 8rem)">
              <Flex maxW="100%" alignItems="top">
                <Heading pr="1rem" wordBreak="break-word" noOfLines={3} overflow="hidden" size="lg">
                  {title}
                </Heading>

                <TooltipWithDelay label={intl.formatMessage(messages.accumulatedProgressTooltip)}>
                  <Box pr={6}>
                    <PercentageProgressIncreaseTag
                      forcePositiveSignal
                      showSignalArrow
                      value={deltaProgress}
                      fontSize="sm"
                      p={2}
                      gridGap={1}
                    />
                  </Box>
                </TooltipWithDelay>
              </Flex>
              <LastUpdateText
                date={lastUpdateDate}
                author={latestCheckIn?.user?.fullName}
                color={updateTextColor}
                fontSize="1rem"
                prefix={intl.formatMessage(prefixMessage)}
                mt={2}
                wordBreak="break-word"
                noOfLines={1}
                overflow="hidden"
                maxW={isTeam ? 'calc(100% - 4rem)' : 'calc(100% - 2rem)'}
              />
            </Box>
            <Box position="absolute" right={0}>
              <Text
                fontSize="5xl"
                fontWeight={600}
                lineHeight={0.7}
                color="brand.500"
                textAlign="right"
              >
                {progress.toFixed() ?? '-'}%
              </Text>
              <Flex alignItems="center" justifyContent="flex-end" mt={3}>
                <Text color="new-gray.600" mr={1}>
                  {intl.formatMessage(messages.projectProgress, {
                    progress: percentualProjectedProgress.toFixed(),
                  })}
                </Text>
                <TooltipWithDelay
                  label={intl.formatMessage(messages.projectProgressTooltip, {
                    progress: percentualProjectedProgress.toFixed(),
                  })}
                  placement="bottom-start"
                  maxWidth="470px"
                >
                  <Flex transform="translateY(-1px)">
                    <InfoCircleIcon
                      fill="new-gray.600"
                      stroke="new-gray.600"
                      desc={intl.formatMessage(messages.projectProgressTooltip, {
                        progress: percentualProjectedProgress.toFixed(),
                      })}
                      cursor="help"
                    />
                  </Flex>
                </TooltipWithDelay>
              </Flex>
            </Box>
          </Flex>

          <Box position="relative" mt={3}>
            <SliderWithDetails
              value={progress}
              projectedProgress={percentualProjectedProgress}
              trackThickness={4}
              thumbWeight="5px"
              thumbHeight={8}
              showSliderDetails={false}
              showThumb={false}
              mt={4}
              thumbColor="new-gray.600"
            />
          </Box>
        </Stack>
      ) : (
        <OverviewSummaryEmptyState title={title} />
      )}
    </Box>
  )
}
