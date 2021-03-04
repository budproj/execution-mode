import {
  AccordionButton,
  AccordionIcon,
  Heading,
  Skeleton,
  Text,
  SkeletonCircle,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Box,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PercentageProgressIncreaseTag from 'src/components/Base/PercentageProgressIncreaseTag'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import CalendarOutlineIcon from 'src/components/Icon/CalendarOutline'
import { Objective } from 'src/components/Objective/types'
import { ConfidenceTag } from 'src/state/hooks/useConfidenceTag/hook'

import messages from './messages'

export interface ObjectiveAccordionButtonProperties {
  objective?: Partial<Objective>
  confidenceTag?: ConfidenceTag
  isLoaded?: boolean
}

const ObjectiveAccordionButton = ({
  objective,
  confidenceTag,
  isLoaded,
}: ObjectiveAccordionButtonProperties) => {
  const intl = useIntl()
  const roundedProgress = Math.round(objective?.status?.progress ?? 0)

  return (
    <AccordionButton gridGap={4} _hover={{}} _focus={{ boxShadow: 'none' }}>
      <Skeleton
        isLoaded={isLoaded}
        {...buildSkeletonMinSize(isLoaded ?? true, 300, 24, {
          loadedWidth: 'auto',
        })}
      >
        <Heading as="h4" fontSize="xl" fontWeight={500} textAlign="left" color="black.900">
          {objective?.title}
        </Heading>
      </Skeleton>

      <AccordionIcon />

      <TooltipWithDelay label={intl.formatMessage(messages.progressTagTooltip)} placement="top">
        <Skeleton
          isLoaded={isLoaded}
          borderRadius="full"
          w={isLoaded ? 'auto' : 70}
          h={isLoaded ? 'auto' : 33}
        >
          <PercentageProgressIncreaseTag
            forcePositiveSignal
            value={objective?.progressIncreaseSinceLastWeek}
            prefix={intl.formatMessage(messages.progressTagLabel)}
          />
        </Skeleton>
      </TooltipWithDelay>

      <Skeleton isLoaded={isLoaded} display="flex" gridGap={2} alignItems="center">
        <CalendarOutlineIcon
          title={intl.formatMessage(messages.calendarIconTitle)}
          desc={intl.formatMessage(messages.calendarIconDesc)}
          fill="gray.300"
          mt="-2px"
        />
        <Text color="gray.300">{intl.formatDate(objective?.cycle?.dateEnd ?? new Date())}</Text>
      </Skeleton>

      <Flex flexGrow={1} justifyContent="flex-end">
        <TooltipWithDelay label={intl.formatMessage(messages.progressTooltip)} placement="top-end">
          <Box>
            <SkeletonCircle isLoaded={isLoaded} size="50px">
              <CircularProgress
                value={roundedProgress}
                thickness={6}
                color={confidenceTag?.color.primary}
                trackColor={confidenceTag?.color.light}
                size={14}
              >
                <CircularProgressLabel
                  color={confidenceTag?.color.primary}
                  fontWeight={700}
                  fontSize="md"
                >
                  {roundedProgress}%
                </CircularProgressLabel>
              </CircularProgress>
            </SkeletonCircle>
          </Box>
        </TooltipWithDelay>
      </Flex>
    </AccordionButton>
  )
}

export default ObjectiveAccordionButton
