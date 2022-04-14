import { Flex, Box, Heading, Text, StyleProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PercentageProgressIncreaseTag } from 'src/components/Base'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import SliderWithDetails from 'src/components/Base/SliderWithDetails'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { Cycle } from 'src/components/Cycle/types'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import { useGetProjectedProgress } from 'src/components/Team/hooks'

import { OverviewSummaryEmptyState } from './empty'
import messages from './messages'
import { OverviewSummarySkeleton } from './skeleton'

interface OverviewSummaryProperties extends StyleProps {
  title: string
  isLoading?: boolean
  cycle: Cycle | undefined
}

export const OverviewSummary = ({
  title,
  isLoading,
  cycle,
  ...rest
}: OverviewSummaryProperties) => {
  const intl = useIntl()

  const { percentualProjectedProgress } = useGetProjectedProgress({
    dateStart: cycle?.dateStart,
    dateEnd: cycle?.dateEnd,
  })

  const progress = cycle?.status?.progress ?? 0
  const deltaProgress = cycle?.delta?.progress ?? 0
  const latestCheckIn = cycle?.status?.latestCheckIn
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined

  const updateTextColor = cycle?.status?.isOutdated ? 'red.500' : 'new-gray.500'
  const prefixMessage = cycle?.status?.isOutdated
    ? messages.outdatedUpdateTextPrefix
    : messages.lastUpdateTextPrefix

  return (
    <Box p={9} bg="white" shadow="for-background.light" borderRadius="lg" {...rest}>
      {isLoading ? (
        <OverviewSummarySkeleton />
      ) : cycle ? (
        <>
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
        </>
      ) : (
        <OverviewSummaryEmptyState title={title} />
      )}
    </Box>
  )
}
