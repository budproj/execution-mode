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
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PercentageProgressIncreaseTag from 'src/components/Base/PercentageProgressIncreaseTag'
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
  const roundedProgress = Math.round(objective?.currentProgress ?? 0)

  return (
    <AccordionButton gridGap={4} _hover={{}}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded ?? true, 300, 24)}>
        <Heading as="h4" fontSize="20px" fontWeight={500}>
          {objective?.title}
        </Heading>
      </Skeleton>

      <AccordionIcon />

      <Skeleton
        isLoaded={isLoaded}
        borderRadius="full"
        w={isLoaded ? 'auto' : 70}
        h={isLoaded ? 'auto' : 33}
      >
        <PercentageProgressIncreaseTag value={objective?.percentageProgressIncrease} />
      </Skeleton>

      <Skeleton isLoaded={isLoaded} display="flex" gridGap={2} alignItems="center">
        <CalendarOutlineIcon
          title={intl.formatMessage(messages.calendarIconTitle)}
          desc={intl.formatMessage(messages.calendarIconDesc)}
          fill="gray.400"
          mt="-2px"
        />
        <Text color="gray.400">{intl.formatDate(objective?.cycle?.dateEnd ?? new Date())}</Text>
      </Skeleton>

      <Flex flexGrow={1} justifyContent="flex-end">
        <SkeletonCircle isLoaded={isLoaded} size="50px">
          <CircularProgress
            value={roundedProgress}
            thickness={6}
            color={confidenceTag?.colors.primary}
            trackColor={confidenceTag?.colors.light}
            size="55px"
          >
            <CircularProgressLabel
              color={confidenceTag?.colors.primary}
              fontWeight={700}
              fontSize="16px"
            >
              {roundedProgress}%
            </CircularProgressLabel>
          </CircularProgress>
        </SkeletonCircle>
      </Flex>
    </AccordionButton>
  )
}

export default ObjectiveAccordionButton
