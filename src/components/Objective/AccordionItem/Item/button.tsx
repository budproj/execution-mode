import { Stack } from '@chakra-ui/layout'
import { AccordionButton, AccordionIcon, Heading, Skeleton, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PercentageProgressIncreaseTag from 'src/components/Base/PercentageProgressIncreaseTag'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { Objective } from 'src/components/Objective/types'
import { ConfidenceTag } from 'src/state/hooks/useConfidenceTag/hook'

import { objectiveAccordionEntryModes } from '../../../../state/recoil/objective/accordion'
import { RadioProgress } from '../../../Base/RadioProgress/wrapper'
import { ObjectiveAccordionMenu } from '../Menu/wrapper'

import messages from './messages'

export interface ObjectiveAccordionButtonProperties {
  accordionIndex: number
  objective?: Partial<Objective>
  teamID?: string
  confidenceTag?: ConfidenceTag
  isLoaded?: boolean
  accordionID?: string
}

const ObjectiveAccordionButton = ({
  objective,
  teamID,
  confidenceTag,
  isLoaded,
  accordionID,
  accordionIndex,
}: ObjectiveAccordionButtonProperties) => {
  const accordionEntryModes = useRecoilValue(objectiveAccordionEntryModes(accordionID))
  const intl = useIntl()

  const entryMode = accordionEntryModes[accordionIndex]
  const roundedProgress = Math.round(objective?.status?.progress ?? 0)

  console.log(entryMode, 'tag')

  return (
    <AccordionButton p={0} gridGap={4} _hover={{}} _focus={{ boxShadow: 'none' }}>
      <TooltipWithDelay label={intl.formatMessage(messages.progressTooltip)} placement="top-end">
        <Box>
          <RadioProgress
            progress={roundedProgress}
            isLoaded={isLoaded}
            size={14}
            color={confidenceTag?.color.primary}
            trackColor={confidenceTag?.color.light}
          />
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

          <ObjectiveAccordionMenu
            teamID={teamID}
            objectiveID={objective?.id}
            isLoaded={isLoaded}
            accordionID={accordionID}
            accordionIndex={accordionIndex}
          />
        </Stack>

        <AccordionIcon />
      </Stack>
    </AccordionButton>
  )
}

export default ObjectiveAccordionButton
