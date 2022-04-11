import { Flex, Box, Heading, Text, StyleProps } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { PercentageProgressIncreaseTag } from 'src/components/Base'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import SliderWithDetails from 'src/components/Base/SliderWithDetails'

import { OverviewSummaryEmptyState } from './empty'
import messages from './messages'
import { OverviewSummarySkeleton } from './skeleton'

interface OverviewSummaryProperties extends StyleProps {
  title: string
  progress: number | undefined
  deltaProgress: number
  isLoading?: boolean
  checkInDate?: Date
}

export const OverviewSummary = ({
  title,
  progress,
  deltaProgress,
  isLoading,
  checkInDate,
  ...rest
}: OverviewSummaryProperties) => {
  const intl = useIntl()

  const [projectedProgress] = useState(50)

  return (
    <Box p={9} bg="white" shadow="for-background.light" borderRadius="lg" {...rest}>
      {isLoading ? (
        <OverviewSummarySkeleton />
      ) : progress ? (
        <>
          <Flex justifyContent="space-between">
            <Box>
              <Flex alignItems="center">
                <Heading size="lg">{title}</Heading>
                <PercentageProgressIncreaseTag
                  forcePositiveSignal
                  showSignalArrow
                  value={deltaProgress}
                  fontSize="sm"
                  p={2}
                  gridGap={1}
                  ml={6}
                />
              </Flex>

              <LastUpdateText date={checkInDate} color="new-gray.500" fontSize="1rem" mt={2} />
            </Box>

            <Box>
              <Text
                fontSize="5xl"
                fontWeight={600}
                lineHeight={0.7}
                color="brand.500"
                textAlign="right"
              >
                {progress}%
              </Text>
              <Text color="new-gray.600" mt={3}>
                {intl.formatMessage(messages.projectProgress, { progress: projectedProgress })}
              </Text>
            </Box>
          </Flex>

          <Box position="relative" mt={3}>
            <SliderWithDetails
              value={progress}
              projectedProgress={projectedProgress}
              trackThickness={4}
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
