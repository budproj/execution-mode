import { Stack } from '@chakra-ui/layout'
import {
  AccordionButton,
  AccordionIcon,
  Heading,
  Skeleton,
  SkeletonCircle,
  CircularProgress,
  CircularProgressLabel,
  Box,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PercentageProgressIncreaseTag from 'src/components/Base/PercentageProgressIncreaseTag'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { Objective } from 'src/components/Objective/types'
import { ConfidenceTag } from 'src/state/hooks/useConfidenceTag/hook'

import { ObjectiveAccordionMenu } from './accordion-menu'
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
    <AccordionButton p={0} gridGap={4} _hover={{}} _focus={{ boxShadow: 'none' }}>
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

      <Skeleton
        isLoaded={isLoaded}
        {...buildSkeletonMinSize(isLoaded ?? true, 300, 24, {
          loadedWidth: 'auto',
        })}
      >
        <Heading as="h4" fontSize="xl" fontWeight={400} textAlign="left" color="black.900">
          {objective?.title}
        </Heading>
      </Skeleton>

      <Stack flexGrow={1} justifyContent="flex-end" direction="row" alignItems="center" spacing="8">
        <Stack spacing={4} direction="row" alignItems="stretch">
          <TooltipWithDelay label={intl.formatMessage(messages.progressTagTooltip)} placement="top">
            <Skeleton
              isLoaded={isLoaded}
              borderRadius={4}
              w={isLoaded ? 'auto' : 140}
              h={isLoaded ? 'auto' : 33}
            >
              <PercentageProgressIncreaseTag
                forcePositiveSignal
                bg="black.100"
                h="full"
                value={objective?.progressIncreaseSinceLastWeek}
                prefix={intl.formatMessage(messages.progressTagLabel)}
              />
            </Skeleton>
          </TooltipWithDelay>

          <Skeleton isLoaded={isLoaded}>
            <ObjectiveAccordionMenu />
          </Skeleton>
        </Stack>

        <AccordionIcon />
      </Stack>
    </AccordionButton>
  )
}

export default ObjectiveAccordionButton
